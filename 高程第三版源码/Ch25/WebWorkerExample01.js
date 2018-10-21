self.onmessage = function(event){
    var data = event.data;
    data.sort(function(a, b){
        return a - b;
    });
    
    self.postMessage(data);
};