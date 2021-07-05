export default (user=[],action)=>
{
    switch(action.type)
    {
        
        case 'ADDUSER':
            return [...user,action.payload];
        default:
            return user;
    }
}