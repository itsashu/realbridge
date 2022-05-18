-------------------------------ROLLBACK SCRIPT------------------------------------------------------------------
PRINT 'DELETING Images table';
IF OBJECT_ID (N'Images', N'U') IS NOT NULL 
	BEGIN
		USE RealBridgeDB
		PRINT 'Using RealBridgeDB';
		DROP TABLE Images;
	END
PRINT 'Images table no longer present';

GO

PRINT 'DELETING RealBridgeDB';
IF DB_ID('RealBridgeDB') IS NOT NULL
	BEGIN
		DROP DATABASE RealBridgeDB;
	END
PRINT 'RealBridgeDB no longer present';