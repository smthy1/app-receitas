import axios from "axios";
import translate from "@iamtraction/google-translate";

async function translateTextToPt(text:string) {
    const translatedText = await translate(text, { to: "pt" });
    return translatedText.text;
}

async function translateTextToEn(text:string) {
    const translatedText = await translate(text, { to: "en" });
    return translatedText.text;
}

async function searchRecipe(meal:string) {
    const url = "https://www.themealdb.com/api/json/v1/1/search.php?s="
    const mealTranslated = await translateTextToEn(meal);

    const req = await axios.get(url + encodeURIComponent(mealTranslated));

    const res = req.data.meals;
    
    if (!res || res.length === 0) { 
        throw new Error("Nenhuma receita encontrada");

    }
    const recipe = res[0];
    const name = await translateTextToPt(recipe.strMeal);
    
    const instructions = (await translateTextToPt(recipe.strInstructions))
        .replace(/\r?\n|\r/g, " ")
        .replace(/\s*-\s*/g, "-")
        .replace(/\s+/g, " ")
        .trim();

    const youtube = recipe.strYoutube;
    const area = await translateTextToPt(recipe.strArea);

    const data = { meal: name, instructions: instructions,youtube: youtube, area: area };

    return data
}


export { searchRecipe }