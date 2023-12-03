const addImage = (arr) =>{
    const challenged = arr.map((driver)=>{
        if(!driver.image?.url.length){
            return{
                ...driver,  
                image:{
                    url:'https://i.pinimg.com/originals/9e/0e/42/9e0e429c0345af13756b0eca558ba539.jpg'
                }
            }
        } else {
            return driver;
        }
    });
    return  challenged
};
module.exports = addImage;