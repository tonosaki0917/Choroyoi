import { FinalAnswers } from "@/screen/QuestionSheetScreen";
import { setProposeData, proposeDataType } from "@/screen/ResultScreen";
import { useDrinkContext } from "../database/DrinkContext";

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

const alcoholData = [
  { id: 1, type: "beer", name: "キリン一番搾り", percentage:"2",flavor: "bitter", soda:"0",rock:"0", information: "info1." },
  { id: 2, type: "beer", name: "キリンクラシックラガー", percentage:"2",flavor: "bitter", soda:"0",rock:"0", information: "info2." },
  { id: 3, type: "beer", name: "サッポロラガー", percentage:"2",flavor: "bitter", soda:"0",rock:"0", information: "info3." },
  { id: 17, type: "beer", name: "キリングリーンズフリー", percentage:"2",flavor: "bitter", soda:"0",rock:"0", information: "info4." },
  { id: 4, type: "beer", name: "オーシャンラッキーゴールド", percentage:"2",flavor: "bitter", soda:"0",rock:"0", information: "info5." },
  { id: 5, type: "sour", name: "レモン", percentage:"2",flavor: "sweet", soda:"1",rock:"0", information: "info6." },
  { id: 6, type: "sour", name: "ライム", percentage:"2",flavor: "sweet", soda:"1",rock:"0", information: "info7." },
  { id: 7, type: "Liquor", name: "さつま寿",percentage:"2", flavor: "bitter", soda:"0",rock:"1", information: "info8." },
  { id: 8, type: "Liquor", name: "富乃宝山", percentage:"2",flavor: "bitter", soda:"0",rock:"1", information: "info8." },
  { id: 9, type: "Liquor", name: "萬年黒麴", percentage:"2",flavor: "bitter", soda:"0",rock:"1", information: "info8." },
  { id: 10, type: "Liquor", name: "いいちこ",percentage:"2", flavor: "bitter", soda:"0",rock:"1", information: "info8." },
  { id: 11, type: "Liquor", name: "赤鹿毛", percentage:"2",flavor: "bitter", soda:"0",rock:"1", information: "info8." },
  { id: 12, type: "Liquor", name: "青鹿毛", percentage:"2",flavor: "bitter", soda:"0",rock:"1", information: "info8." },
  { id: 13, type: "Jalcohol", name: "満寿泉", percentage:"2",flavor: "bitter", soda:"0",rock:"1", information: "info8." },
  { id: 14, type: "ume", name: "梅酒KYOTOUMELABO",percentage:"2", flavor: "bitter", soda:"1",rock:"0", information: "info8." },
  { id: 15, type: "ume", name: "柚子ふわり", percentage:"2",flavor: "sweet", soda:"1",rock:"0", information: "info8." },
  { id: 16, type: "ume", name: "あらごしみかん", percentage:"2",flavor: "sweet", soda:"1",rock:"0", information: "info8." }]

const Final_answer = [
  {id:"q1", ans:"yes"},
  {id:"q2", ans:"no"},
  {id:"q3", ans:"null"},
  {id:"q4", ans:"yes"},
]

const extracted_drinks_list =
    ["キリン一番搾り", "キリンクラシックラガー", "サッポロラガー", "キリングリーンズフリー", "オールシラクァーゴールド", "レモン", "ライム", "ウーロン茶", "金宮生搾りレモンサワー", "さつま白波", "富乃宝山", "萬年黒麹", "いもいち", "赤鹿毛", "青鹿毛", "満寿 泉", "梅酒 KYOTO UMELABO", "柚子ふわり", "あらごしみかん"]

// type Answer = {
//   id: string;
//   ans: string;
// };


export const QuestionResult = (Final_answer): string[] => {
  let Target = ["null", "0", "0", "0"]; // [flavor, soda, rock, other]

  for (let answer of Final_answer) {
    switch (answer.id) {
      case "q1":
        Target[1] = answer.ans === "yes" ? "1" : "0";
        break;
      case "q2":
        Target[2] = answer.ans === "yes" ? "1" : "0";
        break;
      case "q4":
        Target[0] = answer.ans === "yes" ? "sweet" : "bitter";
        break;
    }
  }

  console.log("Target:", Target);
  return Target;
}

//表示に関係するデータだけを抽出する関数
function extractDataType(drink: proposeDataType) {
  const { id, type, name, information } = drink;
  return { id, type, name, information };
}

// 撮影したメニューとDBとで共通する飲み物を抽出
export const getMenu = () =>{
  const { extractedDrinks } = useDrinkContext(); // Contextからデータを取得 
  var selectableList = new Array();
  for(const drink of extractedDrinks){
    for(const b of alcoholData){
      if(b.name.includes(drink)){
        selectableList.push(b)
      }                                  
    }
  }

  console.log(selectableList);
  return selectableList;
}

export const findBestThree = () =>{
  var TopThree = new Array();
  const TargetList = QuestionResult(FinalAnswers)
  console.log("TargetList:", TargetList)
  for(const item of getMenu()){
    if(TopThree.length >= 3){
      break;
    }
    if(item.flavor.includes(TargetList[0]) && item.soda.includes(TargetList[1]) && item.rock.includes(TargetList[2])){
      console.log("item::", item)
      const propItem = extractDataType(item)
      TopThree.push(propItem)
    }
  }

  // 条件に沿うものがなかったとき
  if(TopThree.length == 0){
    for(const item of getMenu()){
      if(TopThree.length >= 3){
        break;
      } 
      if(item.flavor.includes(TargetList[0]) || item.soda.includes(TargetList[1]) || item.rock.includes(TargetList[2])){
        console.log("item::", item)
        const propItem = extractDataType(item)
        TopThree.push(propItem)
      }
    }
  }

  console.log("TopThree::", TopThree, "num:, ", TopThree.length);
  setProposeData(TopThree)
  return TopThree;
}