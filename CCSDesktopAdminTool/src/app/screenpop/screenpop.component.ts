import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { IScreenPop, ICen } from '../model/screenpop';
import { IScreenPopCriteria } from '../model/screenpop';
import { ScreenPopService } from './screenpop.service';
import { AuthService } from "../user/auth.service";
import { IUserLoginProfile } from '../model/user';
import { UserResponse } from '../user/user.model';
import { UserService } from "../user/user.service";
import { NgForm } from "@angular/forms";
import { NgIf } from '@angular/common';
import * as vkbeautify from 'vkbeautify';
import { SelectItem } from 'primeng/api';
import { saveAs as importedSaveAs } from "file-saver";
import { Router } from "@angular/router";
import { parseString } from 'xml2js';
import { environment } from '../../environments/environment';

@Component({
    templateUrl: './screenpop.component.html',
    styleUrls: ['./screenpop.component.css']

})

export class ScreenPopComponent implements OnInit {
    //XSLTtext :string="";
    @Input() wizardURL:string = environment.wizardURL;
    DuplicateStatus: boolean = false;
    InsertStatus: boolean = false;
    ShowXSLT: boolean = false;
    SCPS: SCP[];
    SPConditional: any = [];
    SPOperator: any;
    SPSourceType: any;
    CENS: ICen[];
    @ViewChild('NewUserForm') public userFrm: NgForm;
    @ViewChild('editUserForm') public edituserFrm: NgForm;
    selectedCEN: ICen;
    //CEN: ICen = new NewCallEvent();
    selectedSCP: SCP = { name: "Web Service Call" };
    selectedNewCen: ICen = { name: "AgentStateEvent" };
    XSLTFileUploaded: boolean = false;
    XSLTFilename: boolean = false;
    XSLTRFilename: boolean = false;
    NewHeader: string = "New User";
    mouseoverLogin :boolean=true;
    XSLTRFileUploaded: boolean = false;
    NewbuttonVisible: boolean = false;
    InsertbuttonVisible: boolean = false;
    confirmDeleteDialog:boolean=false;
    deleteRecordType:string;
    ShowXSLTR: boolean = false;
    xslttemp: string = "karthik";
    HasXSLT: boolean = true;
    ClearXSLTFileUploaded: boolean = false;
    ClearXSLTRFileUploaded: boolean = false;
    //HasClearXSLT:boolean = true;
    ClearedFromDBStatus: boolean = false;
    HasXSLTR: boolean = true;
    //HasClearXSLTR:boolean = true;
    XSLTuploadedFiles: any[] = [];
    XSLTRuploadedFiles: any[] = [];
    displayDialog: boolean;
    editDialog: boolean = false;
    addButtonVisible: boolean = true;
    selectButtonVisible: boolean = true;
    editedUDA: boolean = false;
    checked: boolean[] = [];
    editedDSConn: boolean = false;
    ShowDownloadbutton: boolean = false;
    ShowScreenpopxoml: boolean = false;
    ShowScreenpoptextscript: boolean = false;
    Application: boolean = false;
    editedDSComm: boolean = false;
    editedDSCI: boolean = false;
    editedXSLT: boolean = false;
    editedXSLTR: boolean = false;
    screenPop: IScreenPop = new PrimeScreenPop();
    usresp: UserResponse;
    selectedScreenPop: IScreenPop;
    addScreenpopCriteriaDialog: boolean = true;
    selectedBusinessUnitDisplayID:number;
    IdToBeDeleted:number;
    //prioritynumber :number;
    prioritynumberList: SelectItem[] = [];
    screenPopsCriteria: IScreenPopCriteria[];
    newScreenPopsCriteria: any;
    selectedRows: IScreenPop;
    EmptyRows: IScreenPop;
    myReaderXSLT: FileReader;
    myReaderXSLTR: FileReader;
    //parseXML : any = require('xml2js');
    //EditedRow:IScreenPop;
    screenPops: IScreenPop[];
    IsCCSDesktopGlobalAdmin: boolean;
    //addButtonVisible : boolean = true;
    currentUser: IUserLoginProfile;
    PageAccessLevel: number = 1;
    screenpopdisplayid: number;
    UserAccessLevel: number = 0;
    uploadedFilesXSLT: any[] = [];
    uploadedFilesXSLTR: any[] = [];
    NewmyReaderXSLT: FileReader;
    NewmyReaderXSLTR: FileReader;
    NewscreenPop: IScreenPop = new NewPrimeScreenPop();
    NewDialog: boolean = false;
    NewSPCriteriaDialog: boolean = false;
    NewUDA: boolean = false;
    NewDSConn: boolean = true;
    NewDSComm: boolean = true;
    NewDSCI: boolean = true;
    NewXSLT: boolean = true;
    NewXSLTFilename: boolean = false;
    NewuploadedFilesXSLT: any[] = [];
    NewuploadedFilesXSLTR: any[] = [];
    NewHasXSLT: boolean = false;
    NewXSLTR: boolean = true;
    NewXSLTRFilename: boolean = false;
    //NewuploadedFilesXSLTR:boolean = false;
    NewHasXSLTR: boolean = false;
    NewApplication: boolean = false;
    NewShowScreenpopxoml: boolean = true;
    NewShowScreenpoptextscript: boolean = false;
    NewShowDownloadbutton: boolean = false;
    NewXSLTFileUploaded: boolean = false;
    NewXSLTRFileUploaded: boolean = false;
    buid: number;
    constructor(private _screenpopService: ScreenPopService, private authService: AuthService, private route: Router) {
        this.myReaderXSLT = new FileReader();
        this.myReaderXSLTR = new FileReader();
        Array(31).fill(0).map((x, i) => {
            this.prioritynumberList.push({ label: `${i}`, value: i })
            i = i + 1;
        });
        this.SCPS = [
            { name: 'Web Service Call' },
            { name: 'HTML Screen Pop' },
            { name: 'Integrated Browser' },
            { name: 'SQL Query Only' },
            { name: 'Case Data' }
        ];
        this.SPConditional = [
            { value: 0, label: 'AND' },
            { value: 1, label: 'OR' },
            { value: 2, label: 'NOT' }
        ];
        this.SPOperator = [
            { value: 0, label: 'Equals' },
            { value: 1, label: 'GreaterThan' },
            { value: 2, label: 'LessThan' },
            { value: 3, label: 'LengthEquals' },
            { value: 4, label: 'LengthGreaterThan' },
            { value: 5, label: 'LengthLessThan' },
            { value: 6, label: 'Contains' },
            { value: 7, label: 'NotContains' }
        ];
        this.SPSourceType = [
            { value: 0, label: 'CTIVariable' }
            // ,{ value: 1, label: 'ECCVariable' },
            // { value: 2, label: 'VCCVariable' },
            // { value: 3, label: 'LogicalVariable' }
        ];
        this.newScreenPopsCriteria =
            {
                Index: "0", valueTypeText: "", ValueText: "", Conditional: this.SPConditional[0],
                Operator: this.SPOperator[0], SourceType: this.SPSourceType[0]
            };
    }

    ngOnInit() {
        this.currentUser = this.authService.currentUser;
        this.UserAccessLevel = this.currentUser.MyUserInfo.UserAccessLevel;
        this.IsCCSDesktopGlobalAdmin = this.currentUser.MyUserInfo.IsCCSDesktopGlobalAdmin;
        this._screenpopService.getCallEvents()
            .subscribe((res: ICen[]) => {
                this.CENS = res;
            });
        console.log('onit called');
        console.log(this.authService);
    }


    paginate(event) {
        // console.log('pageniate event called');
        // this.addScreenpopCriteriaDialog = true;
        // this.selectedRows = this.EmptyRows;
        //this.LoadScreepops(event.page);
        }
    LoadScreepops(page): void {
        this.selectedRows = this.EmptyRows;
        console.log('Load screenpop called');

        this._screenpopService.getscreenpops(this.buid)
            .subscribe((res: IScreenPop[]) => {
                this.screenPops = res;
            });

        console.log('this.UserAccessLevel' + this.UserAccessLevel + 'this.PageAccessLevel' + this.PageAccessLevel);
        if (this.UserAccessLevel <= this.PageAccessLevel && this.IsCCSDesktopGlobalAdmin) {
            this.addButtonVisible = true;
            this.NewbuttonVisible = true;
            this.InsertbuttonVisible = true;

        }
        else {
            this.addButtonVisible = false;
            this.NewbuttonVisible = false;
            this.InsertbuttonVisible = false;
        }
    }

    LoadScreepopCriteria(index): void {
        console.log('Load screenpop criteria called');

        this._screenpopService.getscreenpopCriteria(index)
            .subscribe((res: IScreenPopCriteria[]) => {
                this.screenPopsCriteria=res;

            });
        console.log('this.screenPopsCriteria' + this.screenPopsCriteria);

    }
    showDeleteConfirmation(rowData,index,recordType){
    this.confirmDeleteDialog = true;
    this.deleteRecordType=recordType;
    this.IdToBeDeleted=this.deleteRecordType==='screenpop'?rowData.businessUnitDisplayID:rowData.BusinessUnitDisplayValueMapID
    }

    DeleteRecord(){
        if(this.deleteRecordType==='screenpop')
        {
        this._screenpopService.delete('api/OmniScreenpop'+ '?Business_Unit_Display_ID=' + this.IdToBeDeleted + '&Author_Id=' + this.authService.currentUser.MyUserInfo.UserId ).subscribe((res) => {
            this.LoadScreepops(this.buid);
            this.confirmDeleteDialog = false;
           });
        }
        else if(this.deleteRecordType==='criteria')
          {
            this._screenpopService.delete('api/OmniScreenpopCriteria'+ '?Business_Unit_Display_Value_Map_ID=' + this.IdToBeDeleted + '&author_id=' + this.authService.currentUser.MyUserInfo.UserId).subscribe((res) => {
                this.LoadScreepopCriteria(this.selectedBusinessUnitDisplayID);
                this.confirmDeleteDialog = false;
               });
          }
    }
    showDialogToAdd(rowData, index, type) {
        this.selectedRows = rowData;
        this.selectedBusinessUnitDisplayID=rowData.businessUnitDisplayID;
        console.log('Show add dialogue called');
        console.log('rowData.businessUnitDisplayID' + rowData.businessUnitDisplayID);
        this.LoadScreepopCriteria(rowData.businessUnitDisplayID);
        this.addScreenpopCriteriaDialog = false;
        console.log('type' + type)

    }

    Download() {
        console.log('download called');
        var blob = new Blob([this.screenPop.Screenpopxoml], { type: 'text' });
        importedSaveAs(blob, "output.txt");

    }
    handleChange(rowData, e, index) {

        let ActiveInt: number;
        console.log(e);
        console.log(rowData);
        console.log(index);
        // this.screenPops[index] = e.checked;

        if (e.checked) {
            ActiveInt = 1;

        }
        else {
            ActiveInt = 0;
        }
        this._screenpopService.putActiveStatus('api/OmniBusinessunit', rowData.businessUnitDisplayID, ActiveInt,this.authService.currentUser.MyUserInfo.UserId).subscribe((res: UserResponse) => {

        });
    }

    ShowEditDialog(rowData, index, type) {
        console.log('Show edit dialogue called');

        this.selectedRows = this.EmptyRows;
        this.addScreenpopCriteriaDialog = true;
        this.XSLTFilename = false;
        this.XSLTRFilename = false;
        console.log(this.XSLTuploadedFiles);
        console.log(this.XSLTRuploadedFiles);
        //this.XSLTuploadedFiles=[];
        //this.XSLTRuploadedFiles=[];
        console.log('rowData');
        console.log(rowData);
        console.log('before assignement this.screenPop');
        console.log(this.screenPop);
        //this.screenPop = new PrimeScreenPop();
        //this.edituserFrm.reset();
        this.screenPop = rowData;
        console.log('after assignement this.screenPop');
        console.log(this.screenPop);//
        this.selectedCEN = { name: this.screenPop.CallEventName };
        this.screenpopdisplayid = rowData.businessUnitDisplayID;
        this.editDialog = true;
        if (this.screenPop.xslt_transform_file !== null && this.screenPop.xslt_transform_file !== undefined && this.screenPop.xslt_transform_file != '') {

            this.HasXSLT = false;
            //this.HasClearXSLT= false;

        }

        else {
            this.HasXSLT = true;
         }
        if (this.screenPop.xslt_transform_file_reply !== null && this.screenPop.xslt_transform_file_reply !== undefined && this.screenPop.xslt_transform_file_reply != '') {
            this.HasXSLTR = false;
         }

        else {

            this.HasXSLTR = true;
        }
        if (this.screenPop.DisplayType == "HTML Screen Pop") {
            console.log("HTML Screen Pop");
            this.editedUDA = false;
            this.editedDSConn = false;
            this.Application = false;
            this.editedDSComm = false;
            this.editedDSCI = false;
            this.editedXSLT = false;
            this.editedXSLTR = false;
            this.ShowScreenpopxoml = true;
            this.ShowScreenpoptextscript = false;
            this.ShowDownloadbutton = true;
        }
        else if (this.screenPop.DisplayType == "SQL Query Only") {
            console.log("SQL Query Only");
            this.editedUDA = false;
            this.Application = false;
            this.editedDSConn = true;
            this.editedDSComm = true;
            this.editedDSCI = true;
            this.editedXSLT = true;
            this.editedXSLTR = true;
            this.ShowScreenpopxoml = true;
            this.ShowScreenpoptextscript = false;
            this.ShowDownloadbutton = true;

        }
        else if (this.screenPop.DisplayType == "Integrated Browser") {
            console.log("Integrated Browser");
            this.editedUDA = true;
            this.editedDSConn = false;
            this.editedDSComm = false;
            this.Application = true;
            this.editedDSCI = false;
            this.editedXSLT = false;
            this.editedXSLTR = false;
            this.ShowScreenpopxoml = false;
            this.ShowScreenpoptextscript = true;
            this.ShowDownloadbutton = false;
        }
        else if (this.screenPop.DisplayType == "Web Service Call") {
            console.log("Active Directory");
            this.editedUDA = true;
            this.editedDSConn = true;
            this.Application = true;
            this.editedDSComm = true;
            this.editedDSCI = true;
            this.editedXSLT = true;
            this.editedXSLTR = true;
            this.ShowScreenpopxoml = false;
            this.ShowScreenpoptextscript = true;
            this.ShowDownloadbutton = true;
        }
        else {
            console.log("HTML Screen Pop");

        }
    }


    businessUnitChangeEvent(message) {

        console.log(message);
        console.log('businessunitchangeevent of screen pop called');
        this.buid = message;
        this.LoadScreepops(message.page);
        this.addScreenpopCriteriaDialog = true;
        

    }

    ViewXSLT() {
        if (this.myReaderXSLT.result !== null && this.myReaderXSLT.result !== undefined) {
            this.screenPop.xslt_transform_file = this.myReaderXSLT.result as string;

        }
        else
            this.screenPop.xslt_transform_file = vkbeautify.xml(this.screenPop.xslt_transform_file);
        //var text;XSLTtext
        this.ShowXSLT = true;
    }

    ViewXSLTR() {
        if (this.myReaderXSLTR.result !== null && this.myReaderXSLTR.result !== undefined)
            this.screenPop.xslt_transform_file_reply = this.myReaderXSLTR.result as string;
        else {
            if (this.screenPop.xslt_transform_file_reply !== null)
                this.screenPop.xslt_transform_file_reply = vkbeautify.xml(this.screenPop.xslt_transform_file_reply);
        }
        //var text;
        this.ShowXSLTR = true;
    }


    cancelEdit() {
        this.editDialog = false;
    }

    YesXSLT() {

        this._screenpopService.putXML('api/OmniScreenPopXML', this.screenPop.businessUnitDisplayID, 1, this.myReaderXSLT.result as string).subscribe((res: UserResponse) => {

        });
        this.XSLTFileUploaded = false;
    }

    NoXSLT() {
        this.XSLTFileUploaded = false;

    }
    YesXSLTR() {
        this._screenpopService.putXML('api/OmniScreenPopXML', this.screenPop.businessUnitDisplayID, 0, this.myReaderXSLTR.result as string).subscribe((res: UserResponse) => {

        });
        this.XSLTRFileUploaded = false;
    }

    NoXSLTR() {
        this.XSLTRFileUploaded = false;

    }
    ClearXSLTRStatus() {
        this.ClearedFromDBStatus = false;

    }

    editUser(form: NgForm) {
        console.log('editUser is called');
        console.log(form);
        console.log('this is form data');
        this.screenPop.author_id = this.authService.currentUser.MyUserInfo.UserId;
        this.screenPop.CallEventName = form.value.cendropdown1.name;
        this.screenPop.DisplayTag = form.value.DisplayTag;
        this.screenPop.ScreenpopHeader = form.value.ScreenpopHeader;
        this.screenPop.display_header = form.value.CaseDataDisplayHeader;
        this.screenPop.display_subheader = form.value.CaseDataDisplaySubHeader;
       this.screenPop.Group = form.value.Group;
        this.screenPop.Priority = form.value.Priority;
        if (this.screenPop.DisplayType == "HTML Screen Pop") {
            console.log("HTML Screen Pop");

            this.screenPop.Screenpopxoml = form.value.Screenpopxoml;
            this.screenPop.Greetings  = form.value.Greetings;
        }
        else if (this.screenPop.DisplayType == "SQL Query Only") {
            console.log("SQL Query Only");

            this.screenPop.data_source_connection_txt = form.value.DSConn;
            this.screenPop.data_source_command_txt = form.value.DSComm;
            this.screenPop.data_source_command_input_txt = form.value.DSCI;
            //this.NewDSCI  = true;
            //this.screenPop.
            //this.NewXSLT  = true;
            //this.NewXSLTR  = true;
            //this.NewShowScreenpopxoml  = true;
            this.screenPop.Screenpopxoml = form.value.Screenpopxoml;
            this.screenPop.Greetings = form.value.Greetings;
            //this.NewShowScreenpoptextscript  = false;
            //this.NewShowDownloadbutton = true;

        }
        else if (this.screenPop.DisplayType == "Integrated Browser") {
            console.log("Integrated Browser");
            this.screenPop.URL_display_address_txt = form.value.UDA;
            // this.NewDSConn  = false;
            // this.NewDSComm = false;
            //this.NewApplication = true;
            // this.NewDSCI  = false;
            // this.NewXSLT  = false;
            // this.NewXSLTR  = false;
            // this.NewShowScreenpopxoml  = false;
            this.screenPop.Greetings = form.value.Screenpoptextscript;
            //this.ShowDownloadbutton = false;
        }
        else if (this.screenPop.DisplayType == "Web Service Call") {
            console.log("Web Service Call");
            this.screenPop.data_source_connection_txt = form.value.DSConn;
            this.screenPop.data_source_command_txt = form.value.DSComm;
            this.screenPop.data_source_command_input_txt = form.value.DSCI;
            this.screenPop.Greetings = form.value.Screenpoptextscript;
            this.screenPop.URL_display_address_txt = form.value.UDA;
            //this.NewUDA  = false;
            //this.NewDSConn  = true;
            //this.NewApplication = false;
            //this.NewDSComm = true;
            //this.NewDSCI  = true;
            //this.NewXSLT  = true;
            //this.NewXSLTR  = true;
            //this.NewShowScreenpopxoml  = false;
            //this.NewShowScreenpoptextscript  = true;
            //this.ShowDownloadbutton = true;
        }
        else {
            console.log("HTML Screen Pop");

        }



        this._screenpopService.put('api/OmniScreenpop', this.screenpopdisplayid, this.screenPop).subscribe((res: UserResponse) => {
            //this.usresp = employeesData;
            if (res.IsSuccess) {
                //this.LoadScreepops(formValues);
                this.editDialog = false;
                this.LoadScreepops(this.buid);
                //this.GetUserList(this.UserAccessLevel,this.agent_id, this.currentBU ,3,"",1,0,0,""); 
            }


        });
        console.log(this.usresp);


    }

    editkeyPress(event: any) {
        const pattern = /[0-9\+\-\ ]/;

        let inputChar = String.fromCharCode(event.charCode);
        if (event.keyCode != 8 && !pattern.test(inputChar)) {
            event.preventDefault();
        }
    }
    NewkeyPress(event: any) {
        const pattern = /[0-9\+\-\ ]/;

        let inputChar = String.fromCharCode(event.charCode);
        if (event.keyCode != 8 && !pattern.test(inputChar)) {
            event.preventDefault();
        }
    }

    ClearXSLT() {

        console.log("ClearXSLT is caled");
        //this.screenPop.xslt_transform_file ="";
        this.ClearXSLTFileUploaded = true;

    }

    YesClearXSLT() {
        console.log("YesClearXSLT is caled");
        this.HasXSLT = true;
        this.ClearedFromDBStatus = true;
        this._screenpopService.DeleteXML('api/OmniScreenPopXML/', this.screenPop.businessUnitDisplayID, 1).subscribe((res: UserResponse) => {

        });

        this.ClearXSLTFileUploaded = false;
        this.XSLTFilename = false;

    }

    NoClearXSLT() {
        console.log("NoClearXSLT is caled");
        this.ClearXSLTFileUploaded = false;

    }
    ClearXSLTR() {
        console.log("ClearXSLTR is caled");
        this.ClearXSLTRFileUploaded = true;

        //this.screenPop.xslt_transform_file_reply ="";

    }

    YesClearXSLTR() {
        console.log("YesClearXSLTR is caled");
        this.HasXSLTR = true;
        this.ClearedFromDBStatus = true;
        this._screenpopService.DeleteXML('api/OmniScreenPopXML', this.screenPop.businessUnitDisplayID, 0).subscribe((res: UserResponse) => {

        });
        this.ClearXSLTRFileUploaded = false;
        this.XSLTRFilename = false;
    }

    NoClearXSLTR() {
        console.log("NoClearXSLTR is caled");
        this.ClearXSLTRFileUploaded = false;
    }
    OnFileRemove(event) {
        console.log("OnFileRemove Called");
        console.log(event);
    }
    OnFileClear(event) {
        console.log("OnFileClear Called");
        console.log(event);
    }
    myUploaderXSLT(event) {
        //var xslt;
        this.uploadedFilesXSLT = [];
        console.log(event);
        var file: File = event.files[0];
        this.uploadedFilesXSLT.push(file);

        this.myReaderXSLT.readAsText(file);

        this.XSLTFileUploaded = true;
        this.HasXSLT = false;
        this.XSLTFilename = true;
    }
    myUploaderXSLTR(event) {
        //var xslt;
        var file: File;
        this.uploadedFilesXSLTR = [];
        //file xslt;
        console.log(event);
        var file: File = event.files[0];
        this.uploadedFilesXSLTR.push(file);
        this.myReaderXSLTR.readAsText(file);
        this.XSLTRFileUploaded = true;
        this.HasXSLTR = false;
        this.XSLTRFilename = true;

    }
    logout() {
        this.authService.logout().subscribe((res: any) => {
            this.route.navigate(["welcome"]);
        })
    }
    Duplicate() {
        this.screenPop.business_unit_id = this.buid;
        this.screenPop.author_id = this.authService.currentUser.MyUserInfo.UserId;
        this._screenpopService.post('api/OmniScreenpop/', this.screenPop).subscribe((res) => {

            this.LoadScreepops(this.buid);
            this.editDialog = false;
            this.DuplicateStatus = true;

            //form.reset();
            // this.LoadUsers(agentDetail);                        
            //  this.addAgentGroupDialog = false;                       
        });
    }
    DuplicateOk() {
        this.DuplicateStatus = false;

    }
    InsertOk() {
        this.InsertStatus = false;

    }
    NewUser(form: NgForm) {
        console.log("New user called");
        console.log("this.buid" + this.buid);
        this.NewscreenPop.business_unit_id = this.buid;
        console.log(this.authService);
        this.NewscreenPop.author_id = this.authService.currentUser.MyUserInfo.UserId;
        this._screenpopService.post('api/OmniScreenpop/', this.NewscreenPop).subscribe((res) => {

            this.LoadScreepops(this.buid);
            this.NewDialog = false;
            this.InsertStatus = true;

            form.reset();
        });
    }
    ShowNewDialog() {
        //PageAccessLevel : number = 1; 
        this.userFrm.reset();
        console.log("Show new dialogue called");
        this.NewDialog = true;
        this.NewscreenPop.DisplayType = "Web Service Call";
        this.NewscreenPop.CallEventName = "AgentStateEvent";
        this.NewscreenPop.Priority = 0;
        this.NewmyReaderXSLT = new FileReader();
        this.NewmyReaderXSLTR = new FileReader();
        //this.NewmyReaderXSLT =null;
        this.NewXSLTFilename = false;
        // this.NewmyReaderXSLTR =null;
        this.NewXSLTRFilename = false;
    }
    createNewSPCriteria() {
        this.NewSPCriteriaDialog = true;
        this.newScreenPopsCriteria =
            {
                Index: "0", valueTypeText: "", ValueText: "", Conditional: this.SPConditional[0],
                Operator: this.SPOperator[0], SourceType: this.SPSourceType[0]
            };

    }
    addCriteria() {
        this.newScreenPopsCriteria.businessUnitDisplayID=this.selectedBusinessUnitDisplayID;
        this.newScreenPopsCriteria.author_id = this.authService.currentUser.MyUserInfo.UserId;
        console.log("this.newScreenPopsCriteria: ", this.newScreenPopsCriteria);
        this._screenpopService.post('api/OmniScreenpopCriteria/', this.newScreenPopsCriteria).subscribe((res) => {

            this.LoadScreepopCriteria(this.selectedBusinessUnitDisplayID);
            this.NewSPCriteriaDialog = false;
           });
    }
    editCriteriaDialog(rowData, index, type) {
        this.newScreenPopsCriteria = rowData;
        this.LoadScreepopCriteria(rowData.businessUnitDisplayID);
        this.NewSPCriteriaDialog = true;
    }
    NewcancelEdit() {
        this.NewDialog = false;
        this.NewSPCriteriaDialog = false;
        this.confirmDeleteDialog=false;
    }
    NewClearXSLT() {
        //console.log(this.NewmyReaderXSLT.result);
        this.NewmyReaderXSLT = null;
        //console.log(this.NewmyReaderXSLT.result);
        this.NewXSLTFilename = false;

    }

    NewClearXSLTR() {
        this.NewmyReaderXSLTR = null;
        this.NewXSLTRFilename = false;

    }

    NewYesXSLT() {

        this.NewscreenPop.xslt_transform_file = this.NewmyReaderXSLT.result as string;
        this.NewXSLTFileUploaded = false;
    }

    NewNoXSLT() {
        this.NewXSLTFileUploaded = false;

    }
    NewYesXSLTR() {

        this.NewscreenPop.xslt_transform_file_reply = this.NewmyReaderXSLTR.result as string;
        this.NewXSLTRFileUploaded = false;
    }

    NewNoXSLTR() {
        this.NewXSLTRFileUploaded = false;

    }
    NewClearXSLTRStatus() {
        this.ClearedFromDBStatus = false;

    }

    EditCenChange(event) {
        //console.log(this.NewscreenPop.DisplayType);
        console.log(event.value);
        //this.screenPop.CallEventName =event.value.name;
    }
    CenChange(event) {
        //console.log(this.NewscreenPop.DisplayType);
        console.log(event.value);
        this.NewscreenPop.CallEventName = event.value.name;
    }
    ScpTypeChange(event) {
        //console.log(this.NewscreenPop.DisplayType);
        console.log(event.value);
        this.NewscreenPop.DisplayType = event.value.name;
        console.log(this.NewscreenPop.DisplayType);

        if (this.NewscreenPop.DisplayType == "HTML Screen Pop") {
            console.log("HTML Screen Pop");
            this.NewUDA = false;
            this.NewDSConn = false;
            this.NewApplication = false;
            this.NewDSComm = false;
            this.NewDSCI = false;
            this.NewXSLT = false;
            this.NewXSLTR = false;
            this.NewShowScreenpopxoml = true;
            this.NewShowScreenpoptextscript = false;
            //this.ShowDownloadbutton = true;
        }
        else if (this.NewscreenPop.DisplayType == "SQL Query Only") {
            console.log("SQL Query Only");
            this.NewUDA = false;
            this.NewApplication = false;
            this.NewDSConn = true;
            this.NewDSComm = true;
            this.NewDSCI = true;
            this.NewXSLT = true;
            this.NewXSLTR = true;
            this.NewShowScreenpopxoml = true;
            this.NewShowScreenpoptextscript = false;
            //this.NewShowDownloadbutton = true;

        }
        else if (this.NewscreenPop.DisplayType == "Integrated Browser") {
            console.log("Integrated Browser");
            this.NewUDA = true;
            this.NewDSConn = false;
            this.NewDSComm = false;
            this.NewApplication = true;
            this.NewDSCI = false;
            this.NewXSLT = false;
            this.NewXSLTR = false;
            this.NewShowScreenpopxoml = false;
            this.NewShowScreenpoptextscript = true;
            //this.ShowDownloadbutton = false;
        }
        else if (this.NewscreenPop.DisplayType == "Web Service Call") {
            console.log("Web Service Call");
            this.NewUDA = false;
            this.NewDSConn = true;
            this.NewApplication = false;
            this.NewDSComm = true;
            this.NewDSCI = true;
            this.NewXSLT = true;
            this.NewXSLTR = true;
            this.NewShowScreenpopxoml = false;
            this.NewShowScreenpoptextscript = true;
            //this.ShowDownloadbutton = true;
        }
        else {
            console.log("HTML Screen Pop");

        }

    }

    NewmyUploaderXSLT(event) {
        //var xslt;
        console.log("NewmyUploaderXSLT called ");
        this.NewuploadedFilesXSLT = [];
        console.log(event);
        var file: File = event.files[0];
        console.log(file);
        this.NewuploadedFilesXSLT.push(file);

        this.NewmyReaderXSLT.readAsText(file);

        this.NewXSLTFileUploaded = true;
        //this.HasXSLT = false;  
        this.NewXSLTFilename = true;
    }
    NewmyUploaderXSLTR(event) {
        //var xslt;
        var file: File;
        this.NewuploadedFilesXSLTR = [];
        //file xslt;
        console.log(event);
        var file: File = event.files[0];
        this.NewuploadedFilesXSLTR.push(file);
        this.NewmyReaderXSLTR.readAsText(file);
        this.NewXSLTRFileUploaded = true;
        //this.HasXSLTR = false;    
        this.NewXSLTRFilename = true;

    }

}

class PrimeScreenPop implements IScreenPop {

    constructor(
        DisplayTag?: string,
        business_unit_id?: number,
        DisplayType?: string,
        CallEventName?: string,
        Group?: number,
        Priority?: number,
        ScreenpopHeader?: string,
        display_header?: string,
        display_subheader?: string,
        Screenpopxoml?: string,
        CallEventID?: number,
        Active?: number,
        IsActive?: boolean,
        Display_type_id?: number,
        data_source_command_txt?: string,
        data_source_connection_txt?: string,
        data_source_command_input_txt?: string,
        URL_display_address_txt?: string,
        xslt_transform_file_reply?: string,
        xslt_transform_file?: string,
        Greetings?: string
    ) { }
}

interface SCP {
    name?: string;
}

// interface ICen {
//   name?: string;
// }

// class ScreenPopCriteria implements IScreenPopCriteria {
//     constructor(
//         businessUnitDisplayID?: number,
//         Index: string = "0",
//         valueTypeText: string = '',
//         ValueText: string = '',
//         Conditional: any,
//         SourceType: string = '') { }
// }

class NewPrimeScreenPop implements IScreenPop {

    constructor(
        DisplayTag?: string,
        business_unit_id?: number,
        DisplayType: string = "Web Service Call",
        CallEventName?: string,
        Group?: number,
        Priority?: number,
        ScreenpopHeader?: string,
        display_header?: string,
        display_subheader?: string,
        Screenpopxoml?: string,
        CallEventID?: number,
        Active?: number,
        IsActive?: boolean,
        Display_type_id?: number,
        data_source_command_txt?: string,
        data_source_connection_txt?: string,
        data_source_command_input_txt?: string,
        URL_display_address_txt?: string,
        xslt_transform_file_reply?: string,
        xslt_transform_file?: string,
        Greetings?: string
    ) { }
}

