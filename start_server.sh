server=$(tmux list-sessions | grep djangoserver);

if [ "$server" -eq 0 ]; then
	tmux attach -t djangoserver
else
	tmux new -s djangoserver
	python3 manage.py runserver 138.4.138.153:8000
fi;

