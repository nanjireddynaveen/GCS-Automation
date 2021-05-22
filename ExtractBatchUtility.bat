@echo off
	cd app
	start ExtractBatchFiles.exe mrr -b "11/05/2018 07:14" -e "11/05/2018 07:15" -p 111042 -o ./Output
	cd Output 
	dir/b >fileName.txt
	copy "fileName.txt" ..\..\tmp\fileName.txt /y
exit
