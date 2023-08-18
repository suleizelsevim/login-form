var app = new Vue({
	el: "#appDiv",
	module:'vuetable-2',
	data: {
		ad: "",
		soyad: "",
		telefon: "",
		eposta: "",
		dogum: "",
		il: "",
		sifre: "",
		sifre2:"",
		cinsiyet: "",
		adres: "",
		website: "",
		abone: false,
		onay:false,
		data1: {},
		isDisplay: true,
		display: "none",
		tblDisplay: "block",
		perPage: 7,
		id: 0,
		uzunluk:"",
		currentPage: 1,
		selectMode: "multi",
		disabled: true,
		silDisabled: true,
		model: {},
		idx:[],
		localData: [],
		selected: [],
		idList: [],
		ay: {},
		checkAbone:false,
		fields: [
        {
        	key: 'ad',
			sortable: true,
			label:"Ad"
        },
        {
        	key: 'soyad',
            sortable: true
        },
        {
            key: 'telefon',
			label: 'Telefon'
		},
		{
			key: 'eposta',
			label:"E-posta"  
		},
		{
			key: 'dogum',
			label:"Doğum Tarihi"
		},
		{
			key: 'il',
			thStyle: "width",
		},
		{
			key: 'cinsiyet',
			sortable: true,
		},
		{
			key: 'abone',
			label:"Abone mi"
		}
		],
		
	},
	methods: {
		form: function () {
			
			var th = this;
			
			th.uzunluk = th.localData.length;
			th.ay = th.localData[th.uzunluk - 1];

			if (th.uzunluk == 0) {
				th.id = 0;
			}
			else {
				th.id = th.ay.id + 1;
			}

			th.data1 = {
				id: th.id,
				isDisabled: true,
				ad: th.ad,
				soyad: th.soyad,
				telefon: th.telefon,
				eposta: th.eposta,
				dogum: th.dogum,
				il: th.il,
				sifre: th.sifre,
				sifre2:th.sifre2,
				cinsiyet: th.cinsiyet,
				adres: th.adres,
				website: th.website,
				abone: th.abone ? "Evet" : "Hayır",
				onay:th.onay?true:false,
				edit: "Düzenle",
				
			};
			
			var localStorageData =JSON.parse(localStorage.getItem("dataArray"))
			localStorageData.push(th.data1)
			
			th.localData = localStorageData;
			th.abone = th.abone ? "Evet" : "Hayır";

			localStorage.setItem("dataArray", JSON.stringify(localStorageData));
			// localData =JSON.parse(localStorage.getItem("dataArray"))
			th.ad = "";
			th.soyad= "";
			th.telefon= "";
			th.eposta= "";
			th.dogum= "";
			th.il= "";
			th.sifre = "";
			th.sifre2 = "";
			th.cinsiyet= "";
			th.adres= "";
			th.website = "";
			th.abone = false;
			th.onay = false;
			
			th.isDisplay = !th.isDisplay;
			th.display = th.isDisplay ? "none" : "block";
			th.tblDisplay = th.isDisplay ? "block" : "none";
		},

		confirmPassword: function () {
			var th = this;
			if (th.sifre == th.sifre2) {
				return this.form();
			}
			else {
				alert("Şifreler eşleşmiyor");
			}
		},

		editButton: function () {
			var th = this;
			let currentData = th.localData.find(x => x.id == idList[0]); 
			th.model = currentData;
			th.checkAbone = currentData.abone=="Evet" ? true : false;
		},

		deleteRow: function () {
			var th = this;
			if (confirm("Emin misin?") == true) {

				th.localData = th.localData.filter(function (item) {
					return !idList.includes(item.id)  
				});
				localStorage.removeItem('dataArray')

				localStorage.setItem('dataArray', JSON.stringify(th.localData));
			}
		},

		addButton: function () {
			var th = this;
			
			th.isDisplay = !th.isDisplay;
			th.display = th.isDisplay ? "none" : "block";
			th.tblDisplay = th.isDisplay ? "block" : "none";
		},

		carpiBtn: function () {
			var th = this;
			th.isDisplay = !th.isDisplay;
			th.display = th.isDisplay ? "none" : "block";
			th.tblDisplay = th.isDisplay ? "block" : "none";
		},

		pageLoad: function () {
			var th = this;
			th.localData = JSON.parse(localStorage.getItem("dataArray"));
			localStorage.setItem('dataArray', JSON.stringify(th.localData));
		},

		aboneFunc: function () {
			th.checkAbone = !th.checkAbone;
			th.model.abone= th.checkAbone == true ? "Evet" : "Hayır";
		},


		modalButton: function () {
			var th = this;
			th.abone= th.abone ? "Evet" : "Hayır"
			localStorage.removeItem('dataArray')
			localStorage.setItem('dataArray', JSON.stringify(th.localData));

			th.$refs['my-modal'].hide()
		},

		onRowSelected(items) {
			th = this;
			th.selected = items;
			
			idList = items.map(function (m) {
				return m.id;
			})
			if (idList.length >= 1) {
				th.silDisabled = false;
			}
			else {
				th.silDisabled = true;
			}
			if (idList.length > 1 || idList.length==0) {
				th.disabled = true;
			}
			else {
				th.disabled=false
			}

			return th.localData[idList];
		},
      	selectAllRows() {
      	  this.$refs.selectableTable.selectAllRows()
      	},
      	clearSelected() {
      	  this.$refs.selectableTable.clearSelected()
		},
		rowSelected() {
			th = this;
			var gridInst = th.$refs.selectableTable;
			if (gridInst) {
				alert(gridInst.getSelectedRowIndexes());
			}
		}
	},

	computed: {
		rows() { //seçilen rowların sayısını buluyor
			var th = this;
			return th.localData.length;
		},
	},

	mounted() {
		var th = this;
		th.pageLoad();
		
	},

});