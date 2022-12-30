/*
* CHALLENGE progresso do formulário

* INSTRUÇÕES
Neste desafio sua missão é criar um formulário e seus 4 campos (com controlled inputs),
juntamente com uma barra de progresso que altera-se conforme o usuário preenche os campos.
- Crie também validações para cada campo conforme instruções abaixo.

* BARRA DE PROGRESSO
Para aproveitar estilização já definida, crie:
- a barra com um elemento pai chamado .bar-container e seu filho .bar

* FUNCIONAMENTO
Espera-se que o formulário tenha 4 campos ao todo. Portanto, quando o usuário preencher
o primeiro campo, a barra de progresso deve assumir 25% do tamanho total;
o segundo campo, 50% e assim por diante...

Caso o usuário não tenha definido valores para os elementos de select e radio,
os mesmos não devem ser considerados como preenchidos até então.

Se o usuário preencher um campo e apagar seu valor, este campo deve ser considerado como vazio,
fazendo com que a barra de progresso regrida novamente.

* CAMPOS DO FORMULÁRIO:
input - nome completo - válido se digitar no mínimo dois nomes,
input - email - válido se digitar um e-mail,
select - estado civil,
radio - gênero

Para validação de e-mail use a seguinte RegEx: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

Desabilitar o botão de enviar caso todos os campos não estejam preenchidos/válidos.

Ao enviar, deve-se apresentar um alert javascript com sucesso, limpar todos os campos
do formulário e zerar a barra de progresso novamente.
*/

import { useEffect, useState } from "react";

const initialStateFormData = {
	fullname: "",
	email: "",
	maritalStatus: "",
	gender: "",
}

function App() {
	const [ formData, setFormData ] = useState(initialStateFormData)
	const [ submitDisabled, setSubmitDisabled] = useState(true)

	useEffect(()=>{
		let progressBarCount = verificationFields(formData)
		setSubmitDisabled(progressBarCount !== 100)
	}, [formData])

	function handleChange (event) {
		const {name, value} = event.target
		
		setFormData((prev) => {
			const newData = {...prev, [name]: value};
			return newData
		})
	}

	function handleSubmit() {
		alert("Formulário finalizado!")
		setFormData(initialStateFormData)
	}

	function verificationFields({ fullname, email, maritalStatus, gender }) {
		let reg = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
		let countProgress = 0
		let fullnameSplit = fullname.split(" ")

		fullnameSplit.length >= 2 && fullnameSplit[fullnameSplit.length - 1] 
			&& [countProgress += 1]
		reg.test(email)
			&& [countProgress += 1]
		!!maritalStatus 
			&& [countProgress += 1]
		!!gender 
			&& [countProgress += 1]

		countProgress = countProgress/4*100
		return countProgress
	}

	const progressBarStyle = {
		width: `${verificationFields(formData)}%`
	}

	return (
		<div className='App'>
			<h3>desafio fernandev</h3>
			<h1>progresso do formulário</h1>

			<main>
				{/* crie a barra de progresso aqui */}
				<div className="bar-container">
					<div className="bar" style={progressBarStyle}>

					</div>
				</div>
				<div className='form-group'>
					<label htmlFor=''>Nome Completo</label>
					<input name="fullname" value={formData.fullname} onChange={handleChange}/>
				</div>
				<div className='form-group'>
					<label htmlFor=''>E-mail</label>
					<input name="email" value={formData.email} onChange={handleChange}/>
				</div>
				<div className='form-group'>
					<label htmlFor=''>Estado Civil</label>
					<select name="maritalStatus" value={formData.maritalStatus} onChange={handleChange}>
						<option value=''>- selecione...</option>
						<option value='solteiro'>Solteiro</option>
						<option value='casado'>Casado</option>
						<option value='divorciado'>Divorciado</option>
					</select>
				</div>
				<div className='form-group'>
					<label htmlFor=''>Gênero</label>
					<div className='radios-container'>
						<span>
							<input type='radio' name="gender" value={"masculino"} onChange={handleChange} checked={formData.gender === "masculino"}/> Masculino
						</span>
						<span>
							<input type='radio' name="gender" value={"feminino"} onChange={handleChange} checked={formData.gender === "feminino"}/> Feminino
						</span>
					</div>
				</div>
				<button disabled={submitDisabled} onClick={handleSubmit}>Enviar Formulário</button>
			</main>
		</div>
	);
}

export default App;
