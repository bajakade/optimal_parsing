  private api: Observable() = this.httpClient.get(`${this.ROOT_URL}/manager/food-order/all`,this.options); // returns data.json
 
 getKitchenOrders(){

    const addItem = (match:string,p1:number,p2:number)=>{
        return `${++p1} ${p2}`
    }
    this.api.getOrders().subscribe((res:any)=>{
          this.table_data_size=res.body.object.length
          
          res.body.object.forEach((order:any,index:number) => {
            let items=''
            let item_total: number[] = []
             order.items.forEach((item:any,i:number) => {
                if(item.name.trim().length>0){
                  if(items.indexOf(item.name)>-1){
                    let regex = new RegExp(`(\\d+)\\s(${item.name})`)
                    items = items.replace(regex, addItem)
                   }else{
                      items = items.length?`${items}, 1 ${item.name}`:`1 ${item.name}`
                  }
                }                      
             });

            this.table_data.push({
                 sn:`${index+1}`,
                 items:`${ items}`,
                 amount: `${order.price}`,
                 paymentmethod:`${order.paymentType}`,
                 paymentstatus: `${order.paymentStatus}`,
                 collector: `${order.collectedBy}`,
                 date:`${order.updatedAt}`
            })
          });

            //this.dataSource = new MatTableDataSource(table_data)
            this.spinner.hide()
            this.applyFilter("")
          },
         (err:any) => {
            if(err.status==401) this.endSession()
              this.spinner.hide()
          },
          () => console.log('Kitchen orders fetched')
      )
  }
  
  
 
  
