class bankSystem {
    constructor(){
        this.bankClientsData = []
    }

    bankMenu(){
        console.log('===== BANK SYSTEM =====');
        console.log('Fazer Login     - Digite 1');
        console.log('Fazer Cadastro  - Digite 2');
        console.log('Fechar Programa - Digite 3');
        this.userProcess = parseInt(prompt('Informe o procedimento: '));
        
        return this.userProcess;
    };

    bankLogin(){
        console.clear();
        alert('Procedimento de Login. Preencha os dados corretamente.');

        this.clientLogEmail = prompt('E-mail do cliente');
        this.clientLogPassword = prompt('Senha do cliente');

        this.clientFound = true

        for (let clientData of this.bankClientsData){
            if (clientData.clientEmail === this.clientLogEmail && clientData.clientPassword === this.clientLogPassword){
                alert(`Seja bem-vindo, ${clientData.clientName}!`);
                this.clientFound = true
                break

            } else {
                this.clientFound = false
            };
        }

        if (!this.clientFound){
            alert('Cliente não encontrado. Tente novamente');
            this.bankLogin();
        };
    };

    bankRegister(){
        console.clear();
        alert('Procedimento de Cadastro. Preencha os dados corretamente.');

        this.clientName = prompt('Nome do cliente: ');
        this.clientEmail = prompt('E-mail do cliente: ');
        this.clientPassword = prompt('Crie uma senha: ');

        this.client = new newClient(this.clientName, this.clientEmail, this.clientPassword);

        function thisEmailExists(email, bankClientsData){
            let emailExists = false

            if (bankClientsData.length === 0){
                console.log('Sem cadastros')
                return false
            };

            bankClientsData.forEach((client) => {
                if (client.clientEmail === email){
                    console.log('Esse e-mail já existe no sistema')
                    return emailExists = true
                };
            });

            return emailExists
        };

        if (thisEmailExists(this.client.clientEmail, this.bankClientsData)){
            alert('O E-mail informado já existe no sistema. Tente com outro e-mail ou faça login.');
        } else {
            this.bankClientsData.push(this.client);
            alert('Cadastro realizado com sucesso.');
        };
    };

    main(){
        while (true){
            this.userProcess = this.bankMenu();

            if (this.userProcess === 1){
                this.bankLogin();

            } else if (this.userProcess === 2){
                this.bankRegister()

            } else if (this.userProcess === 3){
                console.clear()
                alert('Fechando o programa. . . ')
                break

            } else {
                console.clear()
                alert('Procedimento inválido. Tente novamente.')
            };
        };
    };
};

class newClient {
    constructor(clientName, clientEmail, clientPassword){
        this.clientName = clientName
        this.clientEmail = clientEmail
        this.clientPassword = clientPassword

        if (!this.validateName(this.clientName)){
            throw new Error('O nome deve incluir pelo menos o nome e sobrenome.');

        } else if (!this.validatePassword(this.clientPassword)){
            throw new Error('A senha precisa ter no mínimo 8 caracteres e no máximo 16.');
        };
    };

    validateName(name){
        return name.trim().split(' ').length >= 2;
    };

    validatePassword(passowrd){
        return passowrd.length >= 8 && passowrd.length <= 16;
    };
};

new bankSystem().main()