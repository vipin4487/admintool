import { Component, OnInit } from '@angular/core';
import { MenuItem, TreeNode } from 'primeng/api';
import { Observable, Subject } from 'rxjs';
import { WweVagAgentService } from '../shared/services/wwe-vag-agent.service';

@Component({
  selector: 'app-wwe-vag-agent',
  templateUrl: './wwe-vag-agent.component.html',
  styleUrls: ['./wwe-vag-agent.component.css']
})
export class WweVagAgentComponent implements OnInit {

  files1: TreeNode[];

  files2: TreeNode[];
  items: MenuItem[] = [];
  tempItems: MenuItem[] = [];

  home: MenuItem;
  private crumbs: Subject<MenuItem[]>;
  crumbs$: Observable<MenuItem[]>;
  currentLabel: string;
  lastNode: TreeNode;

  constructor(private wweVagAgentService: WweVagAgentService) {
    this.initDefaultVariables();
  }

  initDefaultVariables() {
    this.crumbs = new Subject<MenuItem[]>();
    this.crumbs$ = this.crumbs.asObservable();
  }
  ngOnInit() {
    this.wweVagAgentService.getHierarchicalData().subscribe(files => {
      if(files && files){
        const response: any = files;
        const res = response.data;
        this.files2 = res;
      }
    });
    this.home = { icon: 'fa fa-home' };

  }

  expandAll() {
    this.files2.forEach(node => {
      this.expandRecursive(node, true);
    });
    this.items = [];
    this.crumbs.next(this.items);
  }

  collapseAll() {
    this.files2.forEach(node => {
      this.expandRecursive(node, false);
    });
    this.items = [];
    this.crumbs.next(this.items);
  }
  breadcrumbHandlerForTree(node: TreeNode, isExpand) {
    if (this.currentLabel && node.parent) {
      let parent = node.parent;
      if (node.label === this.currentLabel) {
        this.currentLabel = '';
        // this.lastNode = null;
        parent = node;
      }
      this.expandRecursive(parent, false);
    }
  }
  private expandRecursive(node: TreeNode, isExpand: boolean) {
    node.expanded = isExpand;

    // Breadcrumb click handler
    this.breadcrumbHandlerForTree(node, isExpand);
    // end Breadcrumb click handler

    if (node.children) {
      node.children.forEach(childNode => {
        this.expandRecursive(childNode, isExpand);
      });
    }
  }

  onNodeSelect(event) {
    this.lastNode = event.node;
    const label = event.node.label;
    const items = this.items;
    this.items = [];
    this.prepareBreadCrumb(event.node.parent);
    this.items.reverse().push({ label: label });
    this.setCrumbs(this.items);
  }

  prepareBreadCrumb(node: TreeNode) {
    if (node && node.label) {
      this.items.push({ label: node.label });
    }
    if (node && node.parent) {
      this.prepareBreadCrumb(node.parent);
    }
  }

  onNodeExpand(event) {
    this.onNodeSelect(event);
  }
  onNodeCollapse(event) {
    this.onNodeSelect(event);
  }
  onBreadCrumbClick(event) {
    console.log('clicked fires');
    //console.log(item);

    this.currentLabel = event.item.label;
    const index = this.items.findIndex(f => f.label === this.currentLabel);
    this.items.splice(index + 1, this.items.length - 1);
    this.crumbs.next(this.items);
    this.expandRecursive(this.lastNode, false);
  }
  setCrumbs(items: MenuItem[]) {
    this.crumbs.next(
      (items || []).map(item =>
        Object.assign({}, item, {
          routerLinkActiveOptions: { exact: true }
        })
      )
    );
  }
  ngOnDestroy() {
    this.crumbs.unsubscribe();
  }
  onBreadClick(event, item){
    console.log('onBreadClick');
  }
}
