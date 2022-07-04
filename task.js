function getRequest() {
	let inn = window.inn.value;
	let div = document.getElementById("company"); 

	if (inn.trim().length === 0) {

		return alert("Введите ИНН");
	}
	
	let url = "https://suggestions.dadata.ru/suggestions/api/4_1/rs/findById/party";
	let token = "d337a11ee88d372699587d6b1da84deb96e875ec";
	let query = inn;//"7707083893";

	let options = {
    	method: "POST",
    	mode: "cors",
    	headers: {
        	"Content-Type": "application/json",
        	"Accept": "application/json",
        	"Authorization": "Token " + token
    	},
    	body: JSON.stringify({query: query})
	}

	fetch(url, options)
	.then(response => response.json())
	.then(result => {
		console.clear();
		console.log(result);
		while(div.firstChild){
        	div.removeChild(div.firstChild);
		}
		let span = document.createElement("span");
		let br = document.createElement("br");
		span.innerHTML = "";
		let arrCompany = result.suggestions;

		    arrCompany.forEach((item) => {
			const arr = Object.values(item);
			console.log(arr);
			
			arr.forEach((item) => {
				
				eductionValue(item, span);

				if (isObject(item)) {
					const arrData = Object.values(item);
					console.log(arrData);

					arrData.forEach((item) => {

						eductionValue(item, span);

						if (isObject(item)) {
							const arrData1 = Object.values(item);
					       	console.log(arrData1);

					       	arrData1.forEach((item) => {

					       		eductionValue(item, span);

					       		if (isObject(item)) {
					       			const arrData2 = Object.values(item);
					               	console.log(arrData2);

					               	arrData2.forEach((item) => {

					               		eductionValue(item, span);

					               	});
					       		}
					       	});
				
						} 							
						
					});
	
				}	
				
			});
			 
			span.innerHTML = span.innerHTML + "</br>" + "</br>";
			div.append(span);
		});
			
	})

	.catch(error => console.log("error", error));

}

function isObject(o) {

	return (typeof o === "object" && !Array.isArray(o) && o !== null);
}

function isPrimitive(p) {
	return (typeof p !== 'object' && p !== null);
}

function eductionValue(item, span) {
	if (isPrimitive(item)) {
		span.innerHTML = span.innerHTML + item + ", ";
	}
}	
	