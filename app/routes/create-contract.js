import Ember from 'ember';

export default Ember.Route.extend({
    model(){
        return contractParams;
    },
    actions: {
        sendContract(journalAddress, amountToSend, fileHash){
            // Get contract
            // Promise will be rejected because file isn't json, use rejection function
            Ember.$.getJSON("contracts/PeerReviewContract.sol").then(function () {}, function(value) {
                // promise rejected
                var rawContract = value.responseText;
                console.log(rawContract);

                // compile contract
                var peerReviewCompiled = web3.eth.compile.solidity(rawContract);
                console.log(peerReviewCompiled);

                // Deploy contract
                var _journal = journalAddress;
                var peerReviewContract = web3.eth.contract(peerReviewCompiled.PeerReview.info.abiDefinition);

                var peerReview = peerReviewContract.new(_journal,{from:web3.eth.accounts[0], value: web3.toWei(amountToSend,'ether'), data: peerReviewCompiled.PeerReview.code, gas: 1000000}, function(e, contract){
                  if(!e) {
                    if(!contract.address) {
                      console.log("Contract transaction send: TransactionHash: " + contract.transactionHash + " waiting to be mined...");
                    }
                  } else{
                    console.log(e);
                  }
                });
                console.log(peerReview);
            });
        }
    }
});
