
import { OnInit, Component, enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { DxDataGridModule } from 'devextreme-angular';

import DataSource from 'devextreme/data/data_source';
import { Order, Service } from 'src/app/dataGrid/dataGridService';
import { User } from 'src/app/_models/user';
import { AdminService } from 'src/app/_services/admin.service';


if(!/localhost/.test(document.location.host)) {
  enableProdMode();
}

let getOrderDay = function (rowData: any): number {
  return (new Date(rowData.OrderDate)).getDay();
};

@Component({
  selector: 'app-dev-extreme-data-grid',
  providers: [ Service ],
  templateUrl: './dev-extreme-data-grid.component.html',
  styleUrls: ['./dev-extreme-data-grid.component.css']
})

export class DevExtremeDataGridComponent implements OnInit {
  dataSource: any;   
  filterValue: Array<any>;
  customOperations: Array<any>;
  popupPosition: any;
  saleAmountHeaderFilter: any;
  orders: Order[];
  users: Partial<User[]>;
  allMode: string;
  checkBoxesMode: string;

  constructor(private service: Service, private adminService: AdminService) {
    // this.dataSource = new DataSource({
    //   store: service.getOrders()
    // });

    // this.orders = service.getOrders();

    // console.log(this.dataSource);
    // console.log(this.orders);

    this.allMode = "allPages";
    this.checkBoxesMode = "onClick";

    this.popupPosition = { of: window, at: "top", my: "top", offset: { y: 10 } };

    this.filterValue = [
        ['Employee', '=', 'Clark Morgan'],
        'and',
        ['OrderDate', 'weekends']
    ];

    this.customOperations = [{
        name: "weekends",
        caption: "Weekends",
        dataTypes: ["date"],
        icon: "check",
        hasValue: false,
        calculateFilterExpression: function () {
            return [[getOrderDay, "=", 0], "or", [getOrderDay, "=", 6]];
        }
    }];

    this.saleAmountHeaderFilter = [{
        text: "Less than $3000",
        value: ["SaleAmount", "<", 3000]
    }, {
        text: "$3000 - $5000",
        value: [
            ["SaleAmount", ">=", 3000],
            ["SaleAmount", "<", 5000]
        ]
    }, {
        text: "$5000 - $10000",
        value: [
            ["SaleAmount", ">=", 5000],
            ["SaleAmount", "<", 10000]
        ]
    }, {
        text: "$10000 - $20000",
        value: [
            ["SaleAmount", ">=", 10000],
            ["SaleAmount", "<", 20000]
        ]
    }, {
        text: "Greater than $20000",
        value: ["SaleAmount", ">=", 20000]
    }];
  }

  ngOnInit(): void {
    this.getUsersWithRoles();
  }

  getUsersWithRoles() {
    this.adminService.getUsersWithRoles().subscribe( users => {
      this.users = users;
      console.log(this.users);
    })

    // this.dataSource = new DataSource({
    //   store: this.service.getOrders()
    // });

    // this.orders = this.service.getOrders();

    // console.log(this.dataSource);
    // console.log(this.orders);
  }

  onInitialized(e) {
    e.component.columnOption("SaleAmount", {
        editorOptions: {
            format: "currency",
            showClearButton: true
        }
    });
  }

  rowClickEvent() {  
    console.log("rowClickEvent");  
  } 

  onContextMenuPreparing(e) {
    let items = [];

    const selectedItems = e.component.getSelectedRowKeys();

    const hasEditData = e.component.hasEditData();

    if (selectedItems.length === 0) {
      items = [
        {
          text: "No selected rows",
          disabled: true
        }
      ];
    } else {
      const subItems = [];
      const rowData = e.component.getSelectedRowsData();

      selectedItems.forEach(item => {
        rowData.forEach(data => {
          if (item === data.orderId) {
            subItems.push({
              text: item,
              items: [
                {
                  text: "Edit Row",
                  onClick: () => {
                    e.component.editRow(e.component.getRowIndexByKey(item));
                  }
                },
                {
                  template: function() {
                    return `<div> Region: ${data.region} </div>
                            <div> Country: ${data.country} </div>
                            <div> City: ${data.city} </div>
                            <div> Amount: ${data.amount} </div>
                            <div> Date: ${data.date} </div>
                            `;
                  },
                  onClick: () => {
                    console.log(data);
                  }
                }
              ]
            });
          }
        });
      });

      items = [
        {
          text: "Selected Rows",
          items: subItems
        }
      ];
    }

    items.push(
      {
        text: "Add Row",
        disabled: hasEditData,
        onClick: () => {
          e.component.addRow();
        }
      },
      {
        text: "Save Data",
        disabled: !hasEditData,
        onClick: () => {
          e.component.saveEditData();
        }
      },
      {
        text: "Cancel",
        onClick: () => {
          e.component.cancelEditData();
        }
      }
    );

    e.items = items;
  }

}
