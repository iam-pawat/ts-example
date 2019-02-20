create table TRMOWNER.TEMP_MOB_POST_NAS
(
  OBJECTID      CHAR(32) not null,
  DOCUMENTNO    VARCHAR2(50),
  DOCUMENTDATE  DATE,
  BANNO         VARCHAR2(50),
  INVOICENO     VARCHAR2(50),
  PAIDAMOUNT    VARCHAR2(50),
  NAS_TRANS_ID  VARCHAR2(50),
  STATUS        CHAR(1),
  UPDATEDATE    DATE,
  SYSTEM_NAME   VARCHAR2(50),
  ERRORCODE     VARCHAR2(50),
  ERROR_MESSAGE VARCHAR2(250),
  RETRY         NUMBER(3),
  PROCESS_ID    VARCHAR2(50),
  CREATEDATE    DATE
)