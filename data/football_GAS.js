var COL_DATA_START = 3;
var ROW_DATA_START = 2;

function onOpen() {
    SpreadsheetApp.getUi()
        .createMenu('Football')
        .addItem('Make clone', 'cloneFile')
        .addItem('Lấy link file clone', 'getLinkCloneFile')
        .addToUi();
}

function getLinkCloneFile() {
    var ui = SpreadsheetApp.getUi();
    var fileCloneURL = PropertiesService.getScriptProperties().getProperty('fileCloneURL');
    if (fileCloneURL) {
        ui.alert(
            'Link file clone gần đây nhất',
            fileCloneURL,
            ui.ButtonSet.OK);
    } else {
        ui.alert(
            'Link file clone gần đây nhất',
            'Nhấn Football -> Make clone để tạo file clone',
            ui.ButtonSet.OK);
    }


}

function myOnEdit(e) {
    var fileCloneID = PropertiesService.getScriptProperties().getProperty('fileCloneID');
    if (fileCloneID) {
        var sheetSrc = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
        var sheetName = sheetSrc.getName();
        var rangeSrc = e.range;
        var data = rangeSrc.getValues();
        var dst = SpreadsheetApp.openById(fileCloneID);
        var sheetDst = dst.getSheetByName(sheetName);
        var rangeDst = sheetDst.getRange(rangeSrc.getRow(), rangeSrc.getColumn(), rangeSrc.getNumRows(), rangeSrc.getNumColumns());
        for (var i = 0; i < data.length; i++) {
            for (var j = 0; j < data[i].length; j++) {
                if (data[i][j]) {
                    data[i][j] = 'x';
                }
            }
        }
        rangeDst.setValues(data);
    }
}

function cloneFile() {
    var file = SpreadsheetApp.create('Clone data sân bóng admin');
    var fileCloneID = file.getId();
    PropertiesService.getScriptProperties().setProperty('fileCloneID', fileCloneID);
    PropertiesService.getScriptProperties().setProperty('fileCloneURL', file.getUrl());
    var dst = SpreadsheetApp.openById(fileCloneID);

    var sheets = SpreadsheetApp.getActiveSpreadsheet().getSheets();

    for (var i in sheets) {
        var sheetSrc = SpreadsheetApp.getActiveSpreadsheet().getSheets()[i];

        var newSheet = sheetSrc.copyTo(dst);
        newSheet.setName(sheetSrc.getName());

        var numCol = newSheet.getLastColumn();
        var numRow = newSheet.getLastRow();

        var rangeSrc = sheetSrc.getRange(ROW_DATA_START, COL_DATA_START, numRow - ROW_DATA_START + 1, numCol - COL_DATA_START + 1);
        var data = rangeSrc.getValues();
        for (var i = 0; i < data.length; i++) {
            for (var j = 0; j < data[i].length; j++) {
                if (data[i][j])//If true then it's blank
                {
                    data[i][j] = 'x';
                }
            }
        }
        var rangeDst = newSheet.getRange(ROW_DATA_START, COL_DATA_START, numRow - ROW_DATA_START + 1, numCol - COL_DATA_START + 1);
        rangeDst.setValues(data);
    }
}
