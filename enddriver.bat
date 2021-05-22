@echo off
echo kill all chrome drivers if running
	taskkill /f /t /im chromedriver_74.0.3729.6.exe
	taskkill /f /t /im chromedriver_75.0.3770.140.exe
	taskkill /f /t /im chromedriver_76.0.3809.87.exe
echo All Chrome drivers are stopped / killed
exit