var app = new Vue({
	el: "#appDiv",
	data: {
		ad: "",
		soyad: "",
		telefon: "",
		eposta: "",
		dogum: "",
		il: "",
		cinsiyet: "",
		adres: "",
		website: "",
		abone: false,
		data1: {},
		dataArray: [],
	},
	methods: {
		form: function () {
			var th = this;
			th.data1 = {
				isDisabled: true,
				ad: th.ad,
				soyad: th.soyad,
				telefon: th.telefon,
				eposta: th.eposta,
				dogum: th.dogum,
				il: th.il,
				cinsiyet: th.cinsiyet,
				adres: th.adres,
				website: th.website,
				abone: th.abone ? "Evet" : "Hayır",
				edit: "Düzenle",
			};

			th.dataArray.push(th.data1);

			var bb = th.dataArray;
			localStorage.setItem("veri", JSON.stringify(bb));

			var a = JSON.parse(localStorage.getItem("veri"));
		},
		editButton: function (item) {
			var th = this;
			item.isDisabled = !item.isDisabled;

			item.edit = item.isDisabled ? "Düzenle" : "Tamamla";
		},

		deleteRow: function (index) {
			var th = this;
			if (confirm("Emin misin?") == true) {
				th.dataArray.splice(index, 1);
			}
		},
	},
	mounted() {
		console.log("Say hello acim");
		var th = this;
	},
});