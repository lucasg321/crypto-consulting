from django import forms

from accounts.models import CustomUser


class SendEmailForm(forms.Form):
    message = forms.CharField(widget=forms.Textarea(attrs={'rows': 14}))
    users = forms.ModelMultipleChoiceField(label="To",
                                           queryset=CustomUser.objects.all(),
                                           widget=forms.SelectMultiple())
