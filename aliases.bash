#!/usr/bin/env bash

alias venv="source venv/bin/activate"
alias m="./manage.py"
alias mmg="m makemigrations"
alias mm="m migrate"
alias mrs="m runserver"
alias mrsn="mrs 0.0.0.0:8000"
alias mcs="m collectstatic"
alias ddev="gcloud app deploy --project dev-sandbox-286800 app-dev.yaml"
#alias dprod="gcloud app deploy --project respiralaunch app-prod.yaml"

# Django Extensions commands
alias erdot="./manage.py graph_models -a > erd.dot"
alias erd="erdot && ./manage.py graph_models --pydot -a -g -o erd.png"

# Functions
function csu() {
    m createsuperuser --email "$1" --username "$2"
}
