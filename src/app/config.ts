const ENV: string = 'LOCAL'; // 'LOCAL' or 'REMOTE' based on the environment

const LOCAL_ENDPOINT = 'http://0.0.0.0:5001'
const REMOTE_ENDPOINT = 'https://pe1nvrpbz4.execute-api.us-east-1.amazonaws.com/dev'

type ApiConfig = {
    [key: string]: string;
}; // define the map type to store api urls

const apiConfig: ApiConfig = {
    activeGames: '/fantasyContest/getActiveGames',
    fantasyRanking: '/fantasyContest/displayContestRanking?match_id={matchId}',
    pointsSummary: '/fantasyContest/displayFullSquadSummary?match_id={matchId}&user_id={userId}&user_name={userName}',
    pointsDetails:'/fantasyContest/displayPointsBreakdown?match_id={matchId}&user_id={userId}&user_name={userName}',

    // join league 
    viewSquad: '/squadSelection/viewMySquad', 
    matchSquad: '/squadSelection/fullMatchSquad?match_id={matchId}',

    // Authentication endpoints 
    login: '/auth/login', 
    register: '/auth/register', 
    confirm: '/auth/confirm',
    reset: '/auth/reset', 
    resetWithToken: '/auth/resetWithToken',
    changeUsername: '/auth/changeUsername', 
    changePassword: '/auth/changePassword'
};


export const getApiUrl = (endpoint: string, params: { [key: string]: any } = {}): string => {
    let url: string = apiConfig[endpoint]; 
    if(ENV == 'LOCAL'){ 
        url = LOCAL_ENDPOINT+ url;
    }else{ 
        url = REMOTE_ENDPOINT+ url;
    }
    for (const param in params) {
        url = url.replace(`{${param}}`, encodeURIComponent(params[param]));
    }
    return url;
};