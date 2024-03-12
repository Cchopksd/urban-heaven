const { databaseConfig } = require('../configs/connectDB');

exports.getProvinceModel = async () => {
	try {
		const result = await databaseConfig.query(`
        SELECT
            province_code,
            province_name_en,
            province_name_th
        FROM
            province
        `);
		return result.rows;
	} catch (err) {
		throw err;
	}
};

exports.getDistrictModel = async (id) => {
	try {
		const result = await databaseConfig.query(
			`
        SELECT
            district.district_code,
            district.district_name_en,
            district.district_name_th
        FROM
            district
        RIGHT JOIN
            province ON province.province_code = district.province_code
        WHERE
            district.province_code = $1
        `,
			[id],
		);
		return result.rows;
	} catch (err) {
		throw err;
	}
};

exports.getDistrictModel = async (id) => {
	try {
		const result = await databaseConfig.query(
			`
        SELECT
            district.district_code,
            district.district_name_en,
            district.district_name_th
        FROM
            district
        RIGHT JOIN
            province ON province.province_code = district.province_code
        WHERE
            district.province_code = $1
        `,
			[id],
		);
		return result.rows;
	} catch (err) {
		throw err;
	}
};

exports.getSubdistrictModel = async (id) => {
	console.log(id);
	try {
		const result = await databaseConfig.query(
			`
        SELECT
            subdistrict.postal_code,
            subdistrict.subdistrict_name_th,
            subdistrict.subdistrict_name_en
        FROM
            subdistrict
        RIGHT JOIN
            district ON district.district_code = subdistrict.district_code
        WHERE
            district.district_code = $1
        `,
			[id],
		);
		return result.rows;
	} catch (err) {
		throw err;
	}
};

exports.findProvinceBtID = async (id) => {
    try {
        const result = await databaseConfig.query(
			`
            SELECT 
            `,
		);
	} catch (err) {
		throw err;
	}
};
