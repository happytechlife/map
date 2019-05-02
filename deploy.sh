cd drop
unzip *.zip -d output
cd output
mv server/package.json ./
git init
git add .
git commit -m "push"
heroku git:remote -a happytech-site-production
git push --force heroku master

