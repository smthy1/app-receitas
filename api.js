const input = document.getElementById('nome');
const searchBtn = document.getElementById('search-btn');

input.addEventListener("keypress", function (event) {
    if (event.key === "Enter") {
        event.preventDefault();
        searchBtn.click();
    }
})

window.search = async function () {
    const buscarReceita = document.getElementById('nome');
    const res = document.getElementById('result');
    const url = `https://www.themealdb.com/api/json/v1/1/search.php?s=${buscarReceita.value}`;

    try {
        const resposta = await axios.get(url);
        const resultado = resposta.data.meals;
        
        if (!resultado) {
            res.innerHTML = `Nenhum resultado encontrado para "${buscarReceita.value}".`;
            return;
        }

        const prato = resultado[0].strMeal;
        const instrucoes = resultado[0].strInstructions;
        const origem = resultado[0].strArea;

        res.innerHTML = `
            <div id ="scrollTarget" class="scroll-smooth overflow-y-auto scroll-smooth p-8 mt-8 max-w-4xl mx-8 mt-10 py-4">
                <table class="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
                    <thead class="bg-blue-500 text-white">
                        <tr>
                            <th class="text-center px-8 py-3">Prato</th>
                            <th class="text-center px-8 py-3">Instruções</th>
                            <th class="text-center px-8 py-3">Tutorial</th>
                            <th class="text-center px-8 py-3">Origem</th>
                        </tr>
                    </thead>
                    <tbody class="text-gray-700">
                        <tr class="border-t">
                            <td class="px-8 py-4 font-semibold">${prato}</td>
                            <td class="px-8 py-4">
                                <div class="max-h-40 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-100">
                                    ${instrucoes}
                                </div>
                            </td>
                            <td class="px-8 py-4"> 
                                <a href="${resultado[0].strYoutube}" target="_blank" class="text-blue-500 hover:underline">
                                    Ver vídeo
                                </a>
                            </td>
                            <td class="px-8 py-4">${origem}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        `;
        document.getElementById("scrollTarget")?.scrollIntoView({ behavior: "smooth" });
    } catch (erro) {
        console.error(erro);
        res.innerHTML = "Erro ao buscar a receita.";
    }
};



window.aleatorio = async function () { 
    const res = document.getElementById('result');
    const url = 'https://www.themealdb.com/api/json/v1/1/random.php';

    try {
        const resposta = await axios.get(url);
        const resultado = resposta.data.meals;
        
        if (!resultado) {
            res.innerHTML = `Nenhum resultado encontrado.`;
            return;
        }

        const prato = resultado[0].strMeal;
        const instrucoes = resultado[0].strInstructions;
        const origem = resultado[0].strArea;

        res.innerHTML = `
            <div id ="scrollTarget" class=" overflow-y-auto scroll-smooth p-8 mt-8 max-w-4xl mx-8 mt-10 py-4">
                <table class="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
                    <thead class="bg-blue-500 text-white">
                        <tr>
                            <th class="text-center px-8 py-3">Prato</th>
                            <th class="text-center px-8 py-3">Instruções</th>
                            <th class="text-center px-8 py-3">Tutorial</th>
                            <th class="text-center px-8 py-3">Origem</th>
                        </tr>
                    </thead>
                    <tbody class="text-gray-700">
                        <tr class="border-t">
                            <td class="px-8 py-4 font-semibold">${prato}</td>
                            <td class="px-8 py-4">
                                <div class="max-h-40 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-100">
                                    ${instrucoes}
                                </div>
                            </td>
                            <td class="px-8 py-4"> 
                                <a href="${resultado[0].strYoutube}" target="_blank" class="text-blue-500 hover:underline">
                                    Ver vídeo
                                </a>
                            </td>
                            <td class="px-8 py-4">${origem}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        `;
        document.getElementById("scrollTarget")?.scrollIntoView({ behavior: "smooth" });

    } catch (erro) {
        console.error(erro);
        res.innerHTML = "Erro ao buscar a receita.";
    }
};