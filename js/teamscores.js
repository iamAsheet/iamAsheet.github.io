var teams_data; 
var tableData;
var cell1, cell2, cell3;
//var updatePriceRun = 0;
var refreshIntervalId1 = 0;
function initClient() {
    var API_KEY = 'AIzaSyCr8id8gmmgCSr28P3PxWNiKvga6im2P1s'; // TODO: Update placeholder with desired API key.
    var CLIENT_ID = '288596195086-4kckr5a3iaus4qeo28t4qleoegq0bffd.apps.googleusercontent.com'; // TODO: Update placeholder with desired client ID.
    var SCOPE = 'https://www.googleapis.com/auth/spreadsheets';

    gapi.client.init({
            'apiKey': API_KEY,
            'clientId': CLIENT_ID,
            'scope': SCOPE,
            'discoveryDocs': ['https://sheets.googleapis.com/$discovery/rest?version=v4'],
        })
        .then(function() {
            gapi.auth2.getAuthInstance()
                .isSignedIn.listen(updateSignInStatus);
            updateSignInStatus(gapi.auth2.getAuthInstance()
                .isSignedIn.get());
        });
}

function handleClientLoad() {
    gapi.load('client:auth2', initClient);
}

function updateSignInStatus(isSignedIn) {
    if (isSignedIn) {
        makeApiCall();
    }
}

function handleSignInClick(event) {
    gapi.auth2.getAuthInstance().signIn();
}

function handleSignOutClick(event) {
    gapi.auth2.getAuthInstance().signOut();
}

function getTeamData() { //Google sheets api
    var params = {
        // The ID of the spreadsheet to retrieve data from.
        spreadsheetId: '11hJrOFXSRW0a7Nmfbi9yfQUfl6-kmTscyYOc-29w8gQ',
        // The A1 notation of the values to retrieve.
        ranges: ['TeamScoresR1','TeamScoresR2','TeamScoresR3','TeamScoresR4'],   

        // How values should be represented in the output.
        // The default render option is ValueRenderOption.FORMATTED_VALUE.
        valueRenderOption: 'UNFORMATTED_VALUE', // TODO: Update placeholder value.

    };

    var request = gapi.client.sheets.spreadsheets.values.batchGet(params); // to read data
    request.then(function(response) {
	   console.log( response.result);
        if (response.status == 200) {
            var all_data = response.result;
            teams_data1 = all_data.valueRanges[0].values; //Change for each round
            teams_data2 = all_data.valueRanges[1].values;
            teams_data3 = all_data.valueRanges[2].values;
            teams_data4 = all_data.valueRanges[3].values;
            loadTeamData();
        }
    }, function(reason) {
        console.error('error: ' + reason.result.error.message);
    });
}

loadTeamData = function() {
	  tableData = document.getElementById('scoreTable').getElementsByTagName('tbody')[0];
	  resetTable(tableData);
    var row_count = 0; 
	  round = document.getElementById('round').value;
    //switch()
    for (var k = 1; k < teams_data.length; k += 1) {
				if(stocks_data[k][10] == country_name1){
								var row = tableData.insertRow(row_count);
								cell1 = row.insertCell(0);
								cell1.innerHTML = teams_data[k][0];
								cell2 = row.insertCell(1);
								cell2.innerHTML = teams_data[k][1];
								cell3 = row.insertCell(2);
								//cell4 = row.insertCell(3);
								cell3.innerHTML = teams_data[k][1];
								//cell4.innerHTML = 0.00;
								row_count += 1;
				}
				if( row_count == 13){
					break;
				}
    }
   }
    
    resetTable = function (tableData) {
      if( tableData.rows){
         var rowCount = tableData.rows.length;
         for (var i = 0; i < rowCount; i+=1) {
            tableData.deleteRow(i);
         }
      }else{
         return;		
      }
	  }
