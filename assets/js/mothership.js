var mcon, loc;
var max_date = new Date("9999-12-31 23:59:59")
	.getTime();

// THY SOUL PREPARETH
function choose_victim(v) {
	var i = Math.ceil(Math.random()*loc.length)-1;

	if (v && i === v) {
		return choose_victim(v);
	} else {
		return i;
	}
}

function format_datetime(v) {
	var zero = "00";
	var res =
		(zero + v.getFullYear()).slice(-2) + "-" +
		(zero + (v.getMonth()+1)).slice(-2) + "-" +
		(zero + v.getDate()).slice(-2) + " " +
		(zero + v.getHours()).slice(-2) + ":" +
		(zero + v.getMinutes()).slice(-2) + ":" +
		(zero + v.getSeconds()).slice(-2);

	return res;
}

// THAT MAN NEEDS SOME SUPPORT! SEND A PLANE!
parent.air_support = (dat) => {
	if (!loc) {
		if (!parent.mothership_target) {
			// RETREAT
			return;
		} else {
			loc = parent.mothership_target;
		}
	}

	if (!dat) {
		// Come up with a reasonable price.
		var price = [
			Math.ceil(Math.random()*3000),
			Math.floor(Math.random()*1000),
			Math.floor(Math.random()*500)
		];
		// The man in need of support.
		var man = choose_victim();
		var t = new Date().getTime();

		dat = [
			loc[man],
			loc[choose_victim(man)],
			format_datetime(
				new Date(Math.random()*(max_date-t)+t)
			),
			price[0],
			price[0]+price[1],
			price[0]+price[1]+price[2],
			(price[0]+price[1]+price[2])/100,
			1000
		];
	}

	mcon.query(
		"INSERT INTO flight (\
			flight.from, flight.to, depart, fare_seat,\
			fare_baggage, fare_meal, tax,\
			flight_charge) VALUES (\"" +
			dat[0] + "\",\"" + dat[1] + "\",\"" +
			dat[2] + "\"," + dat[3] + "," + dat[4] +
			"," + dat[5] + "," + dat[6] + "," + dat[7] +
			")",
		(err) => {
		if (err) {
			console.log(err);
		}
	})
}

function loop_support() {
	if (!parent.admin_config ||
		parent.admin_config[2]) {
		parent.air_support();
	}

	setTimeout(loop_support, 2000);
}

function wait_for() {
	if (parent.connection) {
		mcon = parent.connection;

		loop_support();
	} else {
		setTimeout(wait_for, 5000);
	}
}

wait_for()