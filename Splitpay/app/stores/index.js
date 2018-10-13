

import { observable,action } from "mobx"

class store {
   
    @observable title = "";
 
   
    @action set(text)
    {
        this.title=text
        alert(this.title)
    }


}


export default  new store();