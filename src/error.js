var Error = function() { // jshint ignore:line
};

//UNDONE Это не весь перечень ошибок. При необходимости - добавляйте.
Error.UNKNOWN = 1;
Error.TO_MANY_REQUESTS = 2;
Error.INVALID_REQUEST = 3;
Error.TFA_INVALID_CODE = 6;
Error.TFA_INVALID_TOKEN = 7;
Error.CAPTCHA_REQUIRED = 11;
Error.AUTHORIZATION_FAILED = 100;
Error.ACCOUNT_NOT_EXISTS = 101;
Error.SERVICE_ACCOUNT_BLOCKED = 102;
Error.AUTHORIZATION_LIMIT_EXCEED = 103;
Error.UNKNOWN_ACCOUNT_STATUS = 104;
Error.INCORRECT_ACCOUNT_PASSWORD = 105;
Error.INCORRECT_FORMAT_EMAIL = 110;
Error.NICKNAME_FORMAT_INCORRECT = 114;
Error.NICKNAME_EXISTS = 115;
Error.TECHNAME_FORMAT_INCORRECT = 116;
Error.TECHNAME_EXISTS = 117;
Error.UNABLE_CHANGE_TECHNAME = 118;
Error.UNABLE_CHANGE_NICKNAME = 119;
Error.NICKNAME_NOT_SPECIFIED = 121;
Error.TECHNAME_NOT_SPECIFIED = 122;
Error.NICKNAME_FORBIDDEN = 123;
Error.TECHNAME_FORBIDDEN = 124;
Error.SERVICE_AUTHORIZATION_IMPOSSIBLE = 125;
Error.INCORRECT_SMS_CODE = 126;
Error.PHONE_ALREADY_IN_USE = 127;
Error.UNABLE_DELIVER_SMS = 128;
Error.INVALID_PHONE_FORMAT = 129;
Error.PHONE_BLOCKED = 130;
Error.TFA_SMS_TIMEOUT_IS_NOT_EXPIRED = 136;
Error.TFA_NEED_SMS_CODE = 137;
Error.TFA_NEED_APP_CODE = 138;
Error.TFA_INVALID_CODE_OLD = 139;
Error.PARAMETER_MISSING = 200;
Error.WRONG_AUTHTYPE = 201;
Error.WRONG_SERVICEID = 202;
Error.WORNG_AUTHID = 203;
Error.UNKNOWN_METHOD = 204;
Error.PAKKANEN_PERMISSION_DENIED = 601;
Error.PAKKANEN_VK_LINK = 602;
Error.PAKKANEN_PHONE_VERIFICATION = 603;
Error.PAKKANEN_VK_LINK_AND_PHONE_VERIFICATION = 604;


var ErrorEx = function() { // jshint ignore:line
};

ErrorEx.Success = 0;
ErrorEx.UNKNOWN = 1;
ErrorEx.Unauthorized = 2;

ErrorEx.isSuccess = function(code) { return code == ErrorEx.Success; }


