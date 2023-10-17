
//Action Creators:
const GET_NEWS = 'news/GET_NEWS';

//ACTION:

const getNews = (news) => ({
    type: GET_NEWS,
    news
});


//THUNK:

export const thunkGetNews = () => async (dispatch) => {
    const currentDate = new Date();
    const oneWeekAgo = new Date(currentDate);
    oneWeekAgo.setDate(currentDate.getDate() - 7);
    const formattedDate = oneWeekAgo.toISOString().split('T')[0];
    const response = await fetch(`https://newsapi.org/v2/everything?q=cryptocurrency&pageSize=20&from=${formattedDate}&apiKey=1f6448a567ea4d85b93ba930044a6250`);
    if (response.ok) {
        const news = await response.json();
        dispatch(getNews(news));
    }else{
        const errors = await response.json()
        return errors
    }
}


//STATE:
let initialState = {
    news: {}
}

//REDUCER:

const newsReducer = (state=initialState, action) => {
    switch (action.type) {
        case GET_NEWS:
            return {
                ...state,
                news: action.news
            }
        default:
            return state;
    }
}


export default newsReducer
