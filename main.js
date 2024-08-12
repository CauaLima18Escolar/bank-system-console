class bankSystem {
    constructor(){
        this.bankClientsData = []
    }

    bankMenu(){
        console.log('===== BANK SYSTEM =====');
        console.log('Fazer Login     - Digite 1');
        console.log('Fazer Cadastro  - Digite 2');
        console.log('Fechar Programa - Digite 3');
        let userProcess = parseInt(prompt('Informe o procedimento: '));
        
        return userProcess;
    };

    bankLogin(){
        console.clear();
        alert('Procedimento de Login. Preencha os dados corretamente.');

        this.clientLogEmail = prompt('E-mail do cliente');
        this.clientLogPassword = prompt('Senha do cliente');

        this.clientFound = false
        this.currentClientLogged

        if (this.bankClientsData.length !== 0){
            for (let clientData of this.bankClientsData){
                if (clientData.clientEmail === this.clientLogEmail && clientData.clientPassword === this.clientLogPassword){
                    alert(`Seja bem-vindo, ${clientData.clientName}!`);
                    this.clientFound = true
                    this.currentClientLogged = clientData
                    break
    
                } else {
                    this.clientFound = false
                };
            }
        }

        if (!this.clientFound){
            alert('Cliente não encontrado. Tente novamente');
        } else {
            new clientAccountSystem(this.currentClientLogged, this.bankClientsData).main()
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
                return false
            };

            bankClientsData.forEach((client) => {
                if (client.clientEmail === email){
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

    showAllClients(){
        console.clear()
        this.bankClientsData.forEach((client) => {
            console.log(client);
        });
    };

    main(){
        while (true){
            let userProcess = this.bankMenu();

            if (userProcess === 1){
                this.bankLogin();

            } else if (userProcess === 2){
                this.bankRegister();

            } else if (userProcess === 3){
                console.clear();
                alert('Fechando o programa. . . ');
                break;

            } else if (userProcess === 4) {
                this.showAllClients();

            } else {
                console.clear();
                alert('Procedimento inválido. Tente novamente.');
            };
        };
    };
};

class newClient {
    constructor(clientName, clientEmail, clientPassword){
        this.clientName = clientName
        this.clientEmail = clientEmail
        this.clientPassword = clientPassword

        this.clientBalance = 0
        this.clientCredit = 500

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

class clientAccountSystem {
    constructor(currentClient, clientsData){
        this.currentClient = currentClient;
        this.clientsData = clientsData;
    };

    clientAccountMenu(){
        console.log(`===== Cliente: ${this.currentClient.clientName} =====`);
        console.log('Mostrar Saldo            - Digite 1');
        console.log('Fazer um Depósito        - Digite 2');
        console.log('Fazer um Saque           - Digite 3');
        console.log('Fazer uma Transferência  - Digite 4');
        console.log('Sair da conta            - Digite 5');

        let userProcess = parseInt(prompt('Informe o procedimento: '));
        
        return userProcess;
    };

    clientShowBalance(){
        console.clear()
        alert(`Saldo atual: R$ ${this.currentClient.clientBalance.toFixed(2)}`)
    };

    clientDeposit(){
        console.clear();

        while (true){
            let userDeposit = parseFloat(prompt('Informe o valor do depósito: '));
    
            if (isNaN(userDeposit) || userDeposit <= 0){
                alert(`Erro. Informe um valor válido. Saldo atual: R$ ${this.currentClient.clientBalance}`);

            } else {
                this.currentClient.clientBalance += userDeposit;
                alert(`Depósito de R$ ${userDeposit.toFixed(2)} efetuado com sucesso.`);
                break
            };
        };
    };

    clientCashOut(){
        console.clear();

        if (this.currentClient.clientBalance === 0){
            alert('Não é possível efetuar um saque. O Saldo atual é R$ 0.00')

        } else {
            while (true){
                let userCashOut = parseFloat(prompt('Informe o valor do saque: '));
        
                if (isNaN(userCashOut) || userCashOut <= 0 || userCashOut > this.currentClient.clientBalance){
                    alert(`Erro. Informe um valor válido. Saldo atual: R$ ${this.currentClient.clientBalance}`);
    
                } else {
                    this.currentClient.clientBalance -= userCashOut;
                    alert(`Saque de R$ ${userCashOut.toFixed(2)} efetuado com sucesso.`);
                    break
                };
            };
        };
    };

    clientTransfer(){
        let errors = true;
        let whoReceives;
        let transferTo = prompt('Informe o E-mail de destino: ');
    
        this.clientsData.forEach((client) => {
            if (client.clientEmail === transferTo){
                whoReceives = client;
                return errors = false;
            };
        });

        if (errors){
            alert('Este E-mail não está cadastrado no sistema. Tente novamente.');

        } else {
            let transferAmount = parseFloat(prompt('Informe o valor da transferência: '));

            if (isNaN(transferAmount) || transferAmount <= 0 || transferAmount > this.currentClient.clientBalance){
                alert(`Erro. Informe um valor válido. Saldo atual: R$ ${this.currentClient.clientBalance}`);
            } else {
                whoReceives.clientBalance += transferAmount;
                this.currentClient.clientBalance -= transferAmount;
                alert(`Transferência de R$ ${transferAmount} para o usuário ${whoReceives.clientName} efetuada com sucesso.`);
            };
        };
    };

    main(){
        while (true){
            let userProcess = this.clientAccountMenu();

            if (userProcess === 1){
                this.clientShowBalance();

            } else if (userProcess === 2){
                this.clientDeposit();

            } else if (userProcess === 3){
                this.clientCashOut();

            } else if (userProcess === 4) {
                this.clientTransfer();

            } else if (userProcess === 5){
                console.clear()
                console.log('Saindo da conta. . .')
                break
    
            } else {
                console.clear();
                alert('Procedimento inválido. Tente novamente.');
            };
        };
    };
};

new bankSystem().main()