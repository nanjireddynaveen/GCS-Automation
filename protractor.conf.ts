import { Config, browser } from 'protractor';
import { SpecReporter } from 'jasmine-spec-reporter';
import { exec } from 'child_process';
import { protractor } from 'protractor/built/ptor';
import * as moment from 'moment';
import { async } from 'q';

let timeStamp = moment().format('YYYYMMDD_HHmmss');
var ChercherTechJasmineReporter = require('chercher-tech-jasmine-reporter');

export let config: Config = {

  specs: ['./src/tests/**/**/*.js'],
  
  resultJsonOutputFile: 'result.json',
  framework: 'jasmine',
    jasmineNodeOpts: {
    showColors: true,
    defaultTimeoutInterval: 120000,
    print: function () { }
  },

  params: {
    env: "qa",
    userName: "QAAutomation1",
    environment: require('./src/config/params/envDetails').login,
    userType: require('./src/config/params/userDetails').login,
    database: require('./src/config/params/databaseDetails').login,
  },

  SELENIUM_PROMISE_MANAGER: false,

  services: ['selenium-standalone'],
  capabilities: {
    browserName: 'chrome',
    shardTestFiles: false,
    maxInstances: 3,
    chromeOptions: {
      args: [
        'disable-infobars=true',
        'start-maximized=true'
      ],
      prefs: {
        'credentials_enable__service': false,
        download: {
          prompt_for_download: false,
          directory_upgrade: true,
          default_directory: process.cwd() + '\\src\\downloads'
        }
      }
    }
  },
 
  onPrepare: async () => {

    jasmine.getEnv().addReporter(new SpecReporter({
      spec: {
        displayStacktrace: true,
      },
    }));
 
    jasmine.getEnv().addReporter(new ChercherTechJasmineReporter({
      baseDirectory: 'results'+timeStamp+'/screenshots',
      screenshotsSubfolder: 'images',
    }));

    await browser.manage().timeouts().setScriptTimeout(0);
    await browser.manage().timeouts().pageLoadTimeout(120000);
    await browser.manage().timeouts().implicitlyWait(60000);
    await browser.waitForAngularEnabled(false);
    await browser.manage().deleteAllCookies();
  },

  beforeLaunch: async () => {
    var exec = require('child_process').execFile;
    var stopChromeDrivers = function () {
      console.log("Batch file to kill web drivers if running is started");
      exec('enddriver.bat', function (err: any, data: any) {

      });
    }
    var extractBatchUtility = function () {
      console.log("Batch file to extract Batch Utility started");
      exec('ExtractBatchUtility.bat', function (err: any, data: any) {

      });
    }
    var listAllApplicationsInstalledOnMachine = function () {
      console.log("Batch file to list All Applications Installed on Machine started");
      exec('listallapplicationsinstalled.bat', function (err: any, data: any) {

      });
    }

    stopChromeDrivers();
    extractBatchUtility();
    listAllApplicationsInstalledOnMachine();

  },

  onComplete: async () => {
    var origFn = browser.driver.controlFlow().execute;
    browser.driver.controlFlow().execute = function () {
      var args = arguments;
      origFn.call(browser.driver.controlFlow(), function () {
        return protractor.promise.delayed(100);
      });
      return origFn.apply(browser.driver.controlFlow(), args);
    };
   
  },

  afterLaunch:async() =>{
    return new Promise(function(resolve){
    return 0
    })
  },
  
  suites: {
    BatchManagement: './src/tests/cursory-regression-test/BatchManagement/*.js',
    BatchManagementFRT: './src/tests/full-regression-test/BatchManagement/*.js',
    BatchManagementFRTDownloadSpecOne: './src/tests/full-regression-test/BatchManagement/DownloadedFileValidationSpecOne/*.js',
    BatchManagementFRTDownloadSpecTwo: './src/tests/full-regression-test/BatchManagement/DownloadedFileValidationSpecTwo/*.js',
    BatchManagementFRTMultiPrivileges: './src/tests/full-regression-test/BatchManagement/MultiPrivileges/*.js',
    BatchManagementFRTClaimFiles: './src/tests/full-regression-test/BatchManagement/ClaimFiles/*.js',
    BatchManagementFRTAdvancedBatchReprocess: './src/tests/full-regression-test/BatchManagement/AdvancedBatchReprocess/*.js',
    BatchManagementFRTCategoryBatchReprocess: './src/tests/full-regression-test/BatchManagement/CategoryBatchReprocess/*.js',
    BatchManagementFRTDifferentUser: './src/tests/full-regression-test/BatchManagement/DifferentUser/*.js',
    BatchManagementFRTDamagedErrorCategory: './src/tests/full-regression-test/BatchManagement/DamagedErrorCategory/*.js',
    ClientERAManagementFullViewFRT:'./src/tests/full-regression-test/ClientERAManagement/FullView/*.js',
    ClientERAManagementDenialCodesFRT:'./src/tests/full-regression-test/ClientERAManagement/DenialCodes/*.js',
	  ClientERAManagementSSOFRT:'./src/tests/full-regression-test/ClientERAManagement/SSO/*.js',
    ClientERAManagementLessPrivilegeFRT:'./src/tests/full-regression-test/ClientERAManagement/LessPrivilege/*.js',
    ClientERAManagementGridViewFRT : './src/tests/full-regression-test/ClientERAManagement/GridView/*.js',
    ClientERAManagementNoPrivilegeFRT : './src/tests/full-regression-test/ClientERAManagement/NoPrivilege/*.js',
    BuildVerification: './src/tests/build-verification-test/*.js',
    BillingActivityReport: './src/tests/BillingActivityReport/*.js',
    ClaimManagement: './src/tests/cursory-regression-test/ClaimManagement/*.js',
    ClaimManagementFRTFullAccess: './src/tests/full-regression-test/ClaimManagement/FullAccess/*.js',
    ClearinghouseNotifications: './src/tests/cursory-regression-test/ClearinghouseNotifications/*.js',
    ClientERAManagement: './src/tests/cursory-regression-test/ClientERAManagement/*.js',
    ClientPayers: './src/tests/cursory-regression-test/ClientPayers/*.js',
    ClientsPractices: './src/tests/cursory-regression-test/ClientsPractices/*.js',
    ConnectivityMonitor: './src/tests/cursory-regression-test/ConnectivityMonitor/*.js',
    CustomizeLayout: './src/tests/cursory-regression-test/CustomizeLayout/*.js',
    DataVisibilityGroup: './src/tests/cursory-regression-test/DVG/*.js',
    EligibilityManagement: './src/tests/cursory-regression-test/EligibilityManagement/*.js',
    EndPointManagement: './src/tests/cursory-regression-test/EndPointManagement/*.js',
    ERAFromPartner: './src/tests/cursory-regression-test/ERAFromPartner/*.js',
    ERAFromPartnerFRTFullAccess:'./src/tests/full-regression-test/ERAFromPartner/FullAccess/*.js',
    ExecutiveDashboard: './src/tests/cursory-regression-test/ExecutiveDashboard/*.js',
    FilesFromPartner: './src/tests/cursory-regression-test/FilesFromPartner/*.js',
    FilesToPartner: './src/tests/cursory-regression-test/FilesToPartner/*.js',
    GlobalBusinessRule: './src/tests/cursory-regression-test/GlobalBusinessRule/*.js',
    LookupManagement: './src/tests/cursory-regression-test/LookupManagement/*.js',
    MailBoxManagement: './src/tests/cursory-regression-test/MailBoxManagement/*.js',
    NotificationManagement: './src/tests/cursory-regression-test/NotificationManagement/*.js',
    PayerManagement: './src/tests/cursory-regression-test/PayerManagement/*.js',
    PharmacyManagement: './src/tests/cursory-regression-test/PharmacyManagement/*.js',
    PHIAudit: './src/tests/cursory-regression-test/PHIAudit/*.js',
    PrescriberManagement: './src/tests/cursory-regression-test/PrescriberManagement/*.js',
    Reports: './src/tests/cursory-regression-test/Reports/*.js',
    TaskManagement: './src/tests/cursory-regression-test/TaskManagement/*.js',
    TaskManagementFRT: './src/tests/full-regression-test/TaskManagement/*.js',
    TaskManagementFRTFullAccess: './src/tests/full-regression-test/TaskManagement/FullAccess/*.js',
    TaskManagementFRTPartialAccess: './src/tests/full-regression-test/TaskManagement/PartialPrivileges/*.js',
    TaskManagementFRTNonADUser: './src/tests/full-regression-test/TaskManagement/NonADUser/*.js',
    TaskManagementFRTInsufficientPrivileges : './src/tests/full-regression-test/TaskManagement/InsufficientPrivileges/*.js',
    Welcome: './src/tests/cursory-regression-test/Welcome/*.js',
    BatchManagementIntergySSO: './src/tests/cursory-regression-test-IntergySSO/BatchManagement/*.js',
    ClaimManagementIntergySSO: './src/tests/cursory-regression-test-IntergySSO/ClaimManagement/*.js',
    ClientERAManagementIntergySSO: './src/tests/cursory-regression-test-IntergySSO/ClientERAManagement/*.js',
    CustomizeLayoutIntergySSO: './src/tests/cursory-regression-test-IntergySSO/CustomizeLayout/*.js',
    DataVisibilityGroupIntergySSO: './src/tests/cursory-regression-test-IntergySSO/DVG/*.js',
    IntergySSO: './src/tests/cursory-regression-test-IntergySSO/Intergy/*.js',
    MailBoxManagementIntergySSO: './src/tests/cursory-regression-test-IntergySSO/MailBoxManagement/*.js',
    PayerManagementIntergySSO: './src/tests/cursory-regression-test-IntergySSO/PayerManagement/*.js',
    PrimeSuiteIntergySSO: './src/tests/cursory-regression-test-IntergySSO/PrimeSuite/*.js',
    TaskManagementIntergySSO: './src/tests/cursory-regression-test-IntergySSO/TaskManagement/*.js',
    WelcomeIntergySSO: './src/tests/cursory-regression-test-IntergySSO/Welcome/*.js',
  },
  
};