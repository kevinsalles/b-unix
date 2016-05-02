### Backup Service ###

Service de backup de fichier sous linux.
Projet Javascript.

### Configuration  du fichier setup.json ###

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
    