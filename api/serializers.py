from random import shuffle

from rest_framework import serializers
from .models import *
from django.contrib.auth.models import User, Group, Permission


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username', 'email', 'groups']


class GroupSerializer(serializers.ModelSerializer):
    class Meta:
        model = Group
        fields = ['id', 'name', 'permissions']

    def to_representation(self, instance):
        rep = super(GroupSerializer, self).to_representation(instance)
        rep['permissions'] = [{"id": x.id, "permissions": x.name}
                              for x in instance.permissions.all()]
        # ('%s | %s' % (x.content_type.app_labeled_name, x.name))
        return rep


class PermissionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Permission
        fields = '__all__'


class OptionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Option
        fields = ('option', 'is_answer',)


class QuestionSerializer(serializers.ModelSerializer):
    option_set = OptionSerializer(many=True)

    def create(self, validated_data):
        options_data = validated_data.pop('option_set')
        question = Question.objects.create(**validated_data)
        for option_data in options_data:
            Option.objects.create(question=question, **option_data)
        return question

    def update(self, instance, validated_data):
        options_data = validated_data.pop('option_set')
        options = instance.option_set.all()
        options = list(options)
        Question.objects.filter(id=instance.id).update(**validated_data)
        for option_data in options_data:
            option = options.pop(0)
            option.option = option_data.get('option', option.option)
            option.is_answer = option_data.get('is_answer', option.is_answer)
            option.save()
        return instance

    class Meta:
        model = Question
        fields = ('id', 'question', 'option_set')


class QuestionSearchSerializer(serializers.ModelSerializer):
    option_set = OptionSerializer(many=True)

    class Meta:
        model = Question
        fields = ('id', 'question', 'option_set')


class SubjectSerializer(serializers.ModelSerializer):
    class Meta:
        model = Subject
        fields = ('id', 'name', 'questions')

    def to_representation(self, instance):
        rep = super(SubjectSerializer, self).to_representation(instance)
        rep['questions'] = [{"id": x.id, "question": x.question} for x in instance.questions.all()]
        return rep


class OptionSetSerializer(serializers.ModelSerializer):
    class Meta:
        model = OptionSet
        fields = '__all__'


class QuestionSetSerializer(serializers.ModelSerializer):
    examination_option_set = OptionSetSerializer(many=True)

    class Meta:
        model = QuestionSet
        fields = ('id', 'examination', 'set', 'questions', 'examination_option_set')


class ExaminationSerializer(serializers.ModelSerializer):
    def create(self, validated_data):
        sets_number = validated_data.get('total_set')
        total_questions = validated_data.get('total_questions')
        examination = Examination.objects.create(**validated_data)

        for sets in range(sets_number):
            set_obj = ExaminationSet.objects.create(examination=examination, set=sets + 1)
            random_qus = Question.objects.order_by('?')[:total_questions]  # get 5 questions randomly
            for ques in random_qus:
                options_data = list(Option.objects.filter(question_id=ques.id))
                shuffle(options_data)
                question_set = QuestionSet.objects.create(examination_set=set_obj, questions=ques)

                for options in options_data:
                    OptionSet.objects.create(question_set=question_set, option=options)

        return examination

    def update(self, instance, validated_data):
        sets_number = validated_data.get('total_set')
        total_questions = validated_data.get('total_questions')
        Examination.objects.filter(id=instance.id).update(**validated_data)
        ExaminationSet.objects.filter(examination=instance).delete()

        for sets in range(sets_number):
            set_obj = ExaminationSet.objects.create(examination=instance, set=sets + 1)
            random_qus = Question.objects.order_by('?')[:total_questions]  # get 5 questions randomly
            for ques in random_qus:
                options_data = list(Option.objects.filter(question_id=ques.id))
                shuffle(options_data)
                question_set = QuestionSet.objects.create(examination_set=set_obj, questions=ques)

                for options in options_data:
                    OptionSet.objects.create(question_set=question_set, option=options)
        return instance

    class Meta:
        model = Examination
        fields = ('id', 'title', 'subject', 'total_questions', 'total_set',)

    def to_representation(self, instance):
        rep = super(ExaminationSerializer, self).to_representation(instance)
        rep['subject'] = [{"id": x.id, "name": x.name} for x in Subject.objects.filter(id=instance.subject_id)]
        rep['examination_set'] = [{"id": x.id, "set": x.set} for x in
                                  ExaminationSet.objects.filter(examination=instance)]
        return rep


class ExaminationSetSerializer(serializers.ModelSerializer):
    class Meta:
        model = ExaminationSet
        fields = ('id', 'examination', 'set',)

    def to_representation(self, instance):
        rep = super(ExaminationSetSerializer, self).to_representation(instance)
        rep['ques_set'] = [{"question_id": x.id, "question": (x.questions.question if x.questions else ""),
                            "options": [{"option_id": y.id, "option": (y.option.option if y.option else "")}
                                        for y in OptionSet.objects.filter(question_set=x)]}
                           for x in QuestionSet.objects.filter(examination_set=instance)]
        return rep


class AssignSerializer(serializers.ModelSerializer):
    class Meta:
        model = Assign
        fields = ('id', 'user', 'examination', 'set',)

    def to_representation(self, instance):
        rep = super(AssignSerializer, self).to_representation(instance)
        rep['user'] = [{"id": instance.user.id, "username": instance.user.username}]
        rep['examination'] = [{"id": instance.examination.id, "exam": instance.examination.title}]
        rep['set'] = [{"id": instance.set.id, "set_value": instance.set.set}]
        return rep


class UserComponentSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('id', 'username',)


class StartExaminationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Assign
        fields = '__all__'

    def to_representation(self, instance):
        rep = super(StartExaminationSerializer, self).to_representation(instance)
        rep['examination'] = instance.examination.title
        rep['subject'] = instance.examination.subject.name
        rep['set'] = instance.set.set
        rep['ques_set'] = [{"question_id": x.id, "question": (x.questions.question if x.questions else ""),
                            "options": [{"option_id": y.id, "option": (y.option.option if y.option else "")}
                                        for y in OptionSet.objects.filter(question_set=x)]}
                           for x in QuestionSet.objects.filter(examination_set=instance.set)]
        return rep
