from django.db import models
from django.contrib.auth.models import User


class Option(models.Model):
    question = models.ForeignKey('Question', related_name='option_set', on_delete=models.CASCADE)
    option = models.CharField(max_length=255)
    is_answer = models.BooleanField(default=False)  # or True.


class Question(models.Model):
    question = models.CharField(max_length=255)

    def __str__(self):
        return self.question

    # def check_answer(self, option):
    #     return self.option_set.filter(id=option.id, is_answer=True).exists()
    #
    # def get_answers(self):
    #     return self.option_set.filter(is_answer=True)


class Subject(models.Model):
    name = models.CharField(max_length=255)
    questions = models.ManyToManyField(Question)

    def __str__(self):
        return self.name


class Examination(models.Model):
    title = models.CharField(max_length=255)
    subject = models.ForeignKey(Subject, on_delete=models.CASCADE)
    total_questions = models.IntegerField()
    total_set = models.IntegerField()

    def __str__(self):
        return self.title


class ExaminationSet(models.Model):
    examination = models.ForeignKey(Examination, on_delete=models.CASCADE, related_name='examination_set')
    set = models.IntegerField()

    def __str__(self):
        return str(self.set)


class QuestionSet(models.Model):
    examination_set = models.ForeignKey(ExaminationSet, on_delete=models.CASCADE, related_name='examination_set_set')
    questions = models.ForeignKey(Question, on_delete=models.SET_NULL, related_name='questions_set', null=True)


class OptionSet(models.Model):
    question_set = models.ForeignKey(QuestionSet, on_delete=models.CASCADE, related_name='examination_option_set')
    option = models.ForeignKey(Option, on_delete=models.SET_NULL, null=True)


class Assign(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    examination = models.ForeignKey(Examination, on_delete=models.CASCADE)
    set = models.ForeignKey(ExaminationSet, on_delete=models.CASCADE)
