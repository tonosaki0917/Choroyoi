//TODO functions about database

//テスト用のただの例
const options = ["ビール", "焼酎", "梅酒","サワー","日本酒","酒１","酒２","酒３","酒４","酒５","鮭","a","b","c","d","e","f","g"];

export const getAlchol = (id: number) => {

  if (id === 0){
    return {id: id, name: "ビール", info: "びーるびーるのびーる"} //形式は変更可能
  }
  else if (id === 3){
    return {id: id, name: "サワー", info: "さわーさわーくりーむ"} 
  }
  else if (id === 2){
    return {id: id, name: "梅酒", info: "うめうめしゅしゅ"}
  }
  else{
    return {id: id, name: options[id], info: "おいしいよね"}
  }
}