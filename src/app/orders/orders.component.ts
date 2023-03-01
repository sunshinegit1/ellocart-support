import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss'],
})
export class OrdersComponent implements OnInit {
  orders = [
    {
      "id": "12",
      "uid": "19076",
      "rest_id": "15",
      "odate": "2023-02-28 15:26:12",
      "p_method_id": "2",
      "address": "testtestSA Towers, Airport, Bhaskar Nagar, Rajamahendravaram, Andhra Pradesh 533106, India Rajamahendravaram Andhra Pradesh India 533106 ",
      "d_charge": "21",
      "cou_id": "0",
      "cou_amt": "0",
      "o_total": "276",
      "subtotal": "240",
      "trans_id": "2.02302281112128e 34",
      "a_note": "",
      "o_status": "Pending",
      "a_status": "0",
      "rid": "0",
      "order_status": "0",
      "comment_reject": null,
      "vcommission": "15",
      "dcommission": "0",
      "wall_amt": "0",
      "tax": "10",
      "tip": "0",
      "rest_charge": "5",
      "lats": "17.027009595388",
      "longs": "81.801912635565",
      "delivertime": null,
      "atype": "Office",
      "rlats": null,
      "rlongs": null,
      "rest_store": "0",
      "rest_title": null,
      "rider_rate": "0",
      "rider_title": null,
      "otp": ""
    },
    {
      "id": "13",
      "uid": "19076",
      "rest_id": "16",
      "odate": "2023-02-28 15:26:42",
      "p_method_id": "8",
      "address": "testtestSA Towers, Airport, Bhaskar Nagar, Rajamahendravaram, Andhra Pradesh 533106, India Rajamahendravaram Andhra Pradesh India 533106 ",
      "d_charge": "20",
      "cou_id": "0",
      "cou_amt": "0",
      "o_total": "3231",
      "subtotal": "3196",
      "trans_id": "2.02302281112128e 34",
      "a_note": "",
      "o_status": "Pending",
      "a_status": "0",
      "rid": "0",
      "order_status": "0",
      "comment_reject": null,
      "vcommission": "15",
      "dcommission": "0",
      "wall_amt": "0",
      "tax": "10",
      "tip": "0",
      "rest_charge": "5",
      "lats": "17.027009595388",
      "longs": "81.801912635565",
      "delivertime": null,
      "atype": "Office",
      "rlats": null,
      "rlongs": null,
      "rest_store": "0",
      "rest_title": null,
      "rider_rate": "0",
      "rider_title": null,
      "otp": ""
    }
  ]

  constructor(
    private api: ApiService,
  ) { }

  ngOnInit() {
    this.getData()
  }
  getData() {
    this.api.getCall('get_received_orders.php').subscribe((res: any) => {
      console.log(res);
    })
  }
}
