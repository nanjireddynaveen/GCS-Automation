@echo off
	reg query "HKLM\SOFTWARE\Microsoft\Windows\CurrentVersion\Uninstall" /s | findstr /B ".*DisplayName" >%~dp0\tmp\ApplicationsInstalledUsingExe.csv
	wmic product >%~dp0\tmp\ApplicationsInstalledUsingMsi.csv
exit