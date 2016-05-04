File backup service under Linux.
It's a service which allows to do automatically backup files between servers.
However, there is also a recovery system feature.

### Getting started ###

The first step, don't forget to activate ssh connection between servers.<br>
For checked, try this command line on a linux console:
 
    sshpass -p "password" ssh user@host  
then accept typing yes.

It's very important that this command works because b-unix works this way.<br>
If you have a problem with **sshpass**, install it on Linux with the command line :

    apt-get install sshpass

Install b-unix : 
    
    npm install b-unix
    
And : 
    
    var bunix = require("b-unix");
    
You must include a file json like setup.json for all servers parameters.<br>
See 'setup.json file configuration' section for the configuration.<br>
After configuring the file, you can start the automatic backup on your application including in your code:

    bunix.start("./setup.json");
    
and that's all.

When it starts for the first time, the 'b-unix_recovery.js' file is creates in the current directory<br>
You can recovers a backup file executing directly the command line in directory.

    nodejs b-unix_recovery.js
    
It use the file configuration for recovers the backup files.

### setup.json file configuration ###

    {
        "number_backups":"backups number in the time",
        "hour":"hours delay",
        "minute":"minute delay",
        "second":"second delay",
        "config":[
            {
                "name":"backup name",
                "user_dest":"user of remote server",
                "pwd_dest":"user password of remote server",
                "host":"the remote server",
                "path_src":"absolute local path of the backup file without name file",
                "path_copy":"absolute local path of the local copy backup without the name file.",
                "path_dest":"absolute remote path of the backup file without name file",
                "filename":"the backup file name",
                "extension":"file extension"
            }
        ]
    }
    
Example:

    {
        "number_backups":10,
        "hour":24,
        "minute":0,
        "second":0,
        "config":[
            {
                "name":"test",
                "user_dest":"root",
                "pwd_dest":"123456",
                "host":"192.168.219.133",
                "path_src":"./",
                "path_copy":"./bck/",
                "path_dest":"../home/mint2/Desktop/BackupMint1/bck/",
                "filename":"newFile",
                "extension":".txt"
            },
            {
                "name":"test2",
                "user_dest":"root",
                "pwd_dest":"123456",
                "host":"192.168.219.133",
                "path_src":"./",
                "path_copy":"./bck2/",
                "path_dest":"../home/mint2/Desktop/BackupMint1/bck/",
                "filename":"newFile2",
                "extension":".txt"
            }
        ]
    }
    