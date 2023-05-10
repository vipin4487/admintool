@ECHO OFF
for /F "tokens=*" %%A in ('dir "E:\XLDeploy-AppDeploy\*" /AD /B') do (
echo %%A
ECHO  "E:\XLDeploy-AppDeploy\%%A"
RMDIR /S /Q "E:\inetpub\wwwroot\%%A"
XCOPY /E /I "E:\XLDeploy-AppDeploy\%%A" "E:\inetpub\wwwroot\%%A"
)