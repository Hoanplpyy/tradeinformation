import { Component, OnInit } from '@angular/core';
import { linkStructure } from '../interface/navigation/link.interface';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent implements OnInit {
  arrowPath = '../assets/pic/jaguar.png';

//https://stackblitz.com/edit/responsive-menu-angular-material-flex-layout-v6ftus?file=src%2Fapp%2Fapp.component.html

  items: linkStructure[] = [
    {
      imagePathT: '../assets/pic/key_FILL0_wght400_GRAD0_opsz24.svg',
      imagePathF: '../assets/pic/dashboard_black_24dp.svg',
      link: '#',
      active: true
    },
    {
      imagePathT: '../assets/pic/key_FILL0_wght400_GRAD0_opsz24.svg',
      imagePathF: '../assets/pic/rocket_launch_black_24dp.svg',
      link: '#',
      active: false
    },
    {
      imagePathT: '../assets/pic/key_FILL0_wght400_GRAD0_opsz24.svg',
      imagePathF: '../assets/pic/work_outline_black_24dp.svg',
      link: '#',
      active: false
    },
    {
      imagePathT: '../assets/pic/key_FILL0_wght400_GRAD0_opsz24.svg',
      imagePathF: '../assets/pic/event_black_24dp.svg',
      link: '#',
      active: false
    },
    {
      imagePathT: '../assets/pic/key_FILL0_wght400_GRAD0_opsz24.svg',
      imagePathF: '../assets/pic/receipt_black_24dp.svg',
      link: '#',
      active: false
    },
    {
      imagePathT: '../assets/pic/key_FILL0_wght400_GRAD0_opsz24.svg',
      imagePathF: '../assets/pic/redeem_black_24dp.svg',
      link: '#',
      active: false
    },
    {
      imagePathT: '../assets/pic/key_FILL0_wght400_GRAD0_opsz24.svg',
      imagePathF: '../assets/pic/contact_page_black_24dp.svg',
      link: '#',
      active: false
    },
    {
      imagePathT: '../assets/pic/key_FILL0_wght400_GRAD0_opsz24.svg',
      imagePathF: '../assets/pic/build_black_24dp.svg',
      link: '#',
      active: false
    },
    {
      imagePathT: '../assets/pic/key_FILL0_wght400_GRAD0_opsz24.svg',
      imagePathF: '../assets/pic/settings_applications_black_24dp.svg',
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
      else {
        this.items[i].active = false;
      }
    }
  }
}
