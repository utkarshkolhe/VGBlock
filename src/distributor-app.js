// const Web3 = require('web3')
function getCookie(cname) {
  let name = cname + "=";
  let decodedCookie = decodeURIComponent(document.cookie);
  let ca = decodedCookie.split(';');
  for(let i = 0; i <ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) == ' ') {
      c = c.substring(1);
    }
    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length);
    }
  }
  return "";
}


App = {
    loading: false,
    contracts: {},

    load: async () => {
      await App.loadWeb3();
      await App.loadAccount();
      await App.loadContract();
      await App.render();
      web3.eth.defaultAccount = App.account;
    },

    // https://medium.com/metamask/https-medium-com-metamask-breaking-change-injecting-web3-7722797916a8
    loadWeb3: async () => {
      if (typeof web3 !== 'undefined') {
        App.web3Provider = web3.currentProvider
        web3 = new Web3(web3.currentProvider)

      } else {
        window.alert("Please connect to Metamask.")
      }
      // Modern dapp browsers...
      if (window.ethereum) {
        window.web3 = new Web3(ethereum)
        try {
          // Request account access if needed
          await ethereum.enable()
          // Acccounts now exposed
          web3.eth.sendTransaction({/* ... */})
        } catch (error) {
          // User denied account access...
        }
      }
      // Legacy dapp browsers...
      else if (window.web3) {
        App.web3Provider = web3.currentProvider
        window.web3 = new Web3(web3.currentProvider)
        // Acccounts always exposed
        web3.eth.sendTransaction({/* ... */})
      }
      // Non-dapp browsers...
      else {
        console.log('Non-Ethereum browser detected. You should consider trying MetaMask!')
      }
    },

    loadAccount: async () => {
      // Set the current blockchain account
      App.account = web3.eth.accounts[0];
      web3.eth.defaultAccount = web3.eth.accounts[0];
      console.log(App.account);
    },

    loadContract: async () => {
      // Create a JavaScript version of the smart contract
      const vgdata = await $.getJSON('VGData.json')
      App.contracts.VGData = TruffleContract(vgdata)
      App.contracts.VGData.setProvider(App.web3Provider)

      // Hydrate the smart contract with values from the blockchain
      App.vgData = await App.contracts.VGData.deployed()
    },

    render: async () => {
      // Prevent double render
      if (App.loading) {
        return
      }

      // Update app loading state
      App.setLoading(true)

      // Render Account
      $('#account').html(App.account)

      // Render Tasks
      await App.renderTasks()

      // Update loading state
      App.setLoading(false)
    },

    renderTasks: async () => {

    $("#game_gta").click(function() {
      console.log("Adding GTA");
        App.vgData.createLicence("user123@hotmail.com","Grand Theft Auto","WMQ2Y28QH8",true);
        alert('Game purchased');
        return false;
    });
    $("#game_fifa").click(function() {
      console.log("Adding FIFA");
        App.vgData.createLicence("user123@hotmail.com","FIFA","9Q64C9SCM8",true);
        return false;
    });
    $("#game_warframe").click(function() {
      console.log("Adding Warframe");
        App.vgData.createLicence("user123@hotmail.com","Warframe","70EWJT8PXR",false);
        return false;
    });
    $("#game_aoe").click(function() {
        console.log("Adding AOE");
        App.vgData.createLicence("user123@hotmail.com","Age of Empires","001VBZINHB",false);
        return false;
    });

    console.log(document.cookie);
    },

    createTask: async () => {
      App.setLoading(true)
      const content = $('#newTask').val()
      await App.todoList.createTask(content)
      window.location.reload()
    },

    toggleCompleted: async (e) => {
      App.setLoading(true)
      // const taskId = e.target.name
      // await App.todoList.toggleCompleted(taskId)
      window.location.reload()
    },

    setLoading: (boolean) => {
      App.loading = boolean
      const loader = $('#loader')
      const content = $('#content')
      if (boolean) {
        loader.show()
        content.hide()
      } else {
        loader.hide()
        content.show()
      }
    }
  }

  $(() => {
    $(window).load(() => {
      App.load()
    })
  })
