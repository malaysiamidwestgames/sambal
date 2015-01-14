Sambal
============

Welcome to our Sambal project. We have high ambitions, but first, we need to setup our computers :)

Installation instructions
----------------------------

1. Install [Ruby and Rails](https://railsapps.github.io/installing-rails.html)

   We are using Ruby 2.2.0 and Rails 4.2.0. Install the same version (it should be the latest one).

   Unfortunately, it is a bit hard to develop Rails in Windows (buy a Mac people), but you can try RailsInstaller or Nitrous.io (virtual machine).

2. Install [Nodejs](http://nodejs.org/)

   Test installation by typing `node -v` in terminal/command line. It should output the version.

3. Install [Git](http://git-scm.com/)

   For windows users, when given the option [git Bash only, windows command prompt, or linux tools on command prompt](https://bardevblog.files.wordpress.com/2013/10/102613_2336_asimpletuto11.png?w=640), choose windows command prompt.
   
   Test installlation by typing `git -v` in terminal/command line. It should output the version.

4. Install compass

         gem install compass

5. Install grunt and bower

         npm install -g grunt-cli
         npm install -g bower

6. Add your [ssh keys to Github](https://help.github.com/articles/generating-ssh-keys/#platform-windows) 

   For Windows users, you will have Git Bash after you install Git. I highly recommend using Git Bash and not the Windows command line

7. Clone the repo using ssh

        git clone git@github.com:vanblaze/sambal.git

8. Install app dependencies

   Inside the `samabal` folder, run:

        bundle install

   then cd to the `ng-app` folder and run:

        npm install && bower install
        
You should be all set! Open two terminal tabs, cd into sambal directory and run `rails s` on one tab. cd into ng-app directory and run `grunt serve`. Now you have the app running on your machine!
