import { Component, OnInit } from '@angular/core';
import { linkStructure } from '../interface/navigation/link.interface';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent implements OnInit {
  arrowPath='../assets/pic/navigate_next_FILL0_wght400_GRAD0_opsz48.svg';
  items: linkStructure[] = [
    {
      imagePath: '../assets/pic/dashboard_black_24dp.svg',
      link: '#',
      active: true
    },
    {
      imagePath: '../assets/pic/rocket_launch_black_24dp.svg',
      link: '#',
      active: false
    },
    {
      imagePath: '../assets/pic/work_outline_black_24dp.svg',
      link: '#',
      active: false
    },
    {
      imagePath: '../assets/pic/event_black_24dp.svg',
      link: '#',
      active: false
    },
    {
      imagePath: '../assets/pic/receipt_black_24dp.svg',
      link: '#',
      active: false
    },
    {
      imagePath: '../assets/pic/redeem_black_24dp.svg',
      link: '#',
      active: false
    },
    {
      imagePath: '../assets/pic/contact_page_black_24dp.svg',
      link: '#',
      active: false
    },
    {
      imagePath: '../assets/pic/build_black_24dp.svg',
      link: '#',
      active: false
    },
    {
      imagePath: '../assets/pic/settings_applications_black_24dp.svg',
      link: '#',
      active: false
    },
  ]

  constructor() { }

  ngOnInit(): void {

  }

  activateClass(index: number) {
    for (let i = 0; i < this.items.length; i++) {
      if (i === index) {
        this.items[i].active = true;
      }
      else{
        this.items[i].active = false;
      }
    }
  }
}
