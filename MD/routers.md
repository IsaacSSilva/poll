[< voltar](../Readme.md)



## Routes:

| use a estencao do VS Code: [REAST Client](https://marketplace.visualstudio.com/items?itemName=humao.rest-client), para facilitar o uso das requisição 👇
> [ 🌐 Requisições ](http/routes.http)


##### Creat polls
criar uma enquetes
 - post
```http
http://localhost:3333/polls
```
```json
 // exemplo corpo:

{
	"title": "tecnologias para front end vocês querem usar ?",
	"options": [
		"next.js",
		"remix",
		"Astro",
		"html, css, javascript"
	]
}
```

##### New Vote
criar um voto entre as opcoes
 - post
```http
http://localhost:3333/polls/[:pollId]/voto
```
```json
 // exemplo corpo:

{
	"pollOptionId": "299f7e07-f0ea-4cda-900a-6e0d33c1571e"
}
```

##### get all polls
criar um voto entre as opcoes
 - get
```http
http://localhost:3333/polls/all
```
```json
 // exemplo retorno:

{
	"poll": [
		{
			"id": "10d33be6-e1a2-456a-b9be-9695a331bca9",
			"title": "tecnologias para front end vocês querem usar ?",
			"createdAt": "2001-01-10T06:01:10.011Z",
			"updatedAt": "2001-01-10T06:01:10.011Z"
		},
    {
			"id": "3af1fe0b-212e-4253-b933-09f99c04b7d2",
			"title": "tecnologias para front end vocês querem usar ?",
			"createdAt": "2001-01-10T06:01:10.011Z",
			"updatedAt": "2001-01-10T06:01:10.011Z"
		}
	]
}
```

##### get polls
puxar uma enquetes expecifica
 - get
```http
http://localhost:3333/polls/[:pollId]
```

```json
// retorno


{
	"poll": {
		"id": "10d33be6-e1a2-456a-b9be-9695a331bca9",
		"title": "tecnologias para front end vocês querem usar ?",
		"options": [
			{
				"id": "299f7e07-f0ea-4cda-900a-6e0d33c1571e",
				"title": "next.js",
				"score": 1
			},
			{
				"id": "b4dfc8f7-fec8-46cc-b75f-3ef10dacadcb",
				"title": "remix",
				"score": 0
			},
			{
				"id": "b008abea-9d55-422e-9ee4-8f610631f711",
				"title": "Astro",
				"score": 0
			},
			{
				"id": "d5b9f00f-24ee-4558-96fd-ca12ce2e63ef",
				"title": "html, css, javascript",
				"score": 0
			}
		]
	}
}
```

##### delete polls
deletar uma enquetes expecifica
 - delete
```http
http://localhost:3333/polls/[:pollId]
```

```json
 // aprovacao para ser deletado.

{
	"approval": true
}
```

caso passe ``` false ``` em ``` appoval ``` a menssagem de erro sera:
```json
 // menssagem

{
"message": "Was not approved to delete the poll."
}
```