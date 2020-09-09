// Вернуть градусы в радианах
const getR = (x) => x * Math.PI / 180;
// Вернуть радианы в градусы
const getGrad = (x) => 180 / Math.PI * x;

// Возвращает угол места
export const calcAngleGuidance = (g1, g2, v) => {
  let result = getGrad(Math.atan(
      (Math.cos(getR(g2 - g1)) * Math.cos(getR(v)) - 0.151) /
      Math.sqrt(1 - Math.pow(Math.cos(getR(g2 - g1)), 2) * Math.pow(Math.cos(getR(v)), 2))
  ));
  return result.toFixed(2);
};

// = 180° +- arctg{tg(g2 - g1)/sin(v)}
export const calcAzimut = (g1, g2, v) => (180 + getGrad(Math.atan(Math.tan(getR(g2 - g1)) / Math.sin(getR(v))))).toFixed(2);

// console.log('Солнечногорск: ', calcAngleGuidance(36, 37, 56.1851));
// console.log('calcAngleGuidance: ', calcAngleGuidance(140, 104.3071, 52.2736));
// console.log(`calcAzimut`, calcAzimut(140, 104.3071, 52.2736));


// // 0.7853981633974483
// console.log('Math.atan(0,4875): 26', Math.atan(0.4875));
// // 0
// console.log('Math.atan(0);: ', Math.atan(0));
// const a = Math.cos(getR(g2 - g1));
// console.log(`g2 - g1: 0,9998 `, a);

// const b = Math.cos(getR(v));
// console.log(`cos(v): 0,83109 `, b);

// const resUp = a * b - 0.151;

// const d = Math.pow(Math.cos(getR(g2 - g1)), 2);
// console.log(`Math.cos 2: 0,9996 `, d);
// const e = Math.pow(Math.cos(getR(v)), 2);
// console.log(`Math.pow(Math.cos(getR(v)): 0,3094 `, e);

// const resDown = Math.sqrt(1 - d * e);
// console.log(`Math.sqrt(1 - d * e): 0,5561 `, resDown);

// const res = resUp / resDown;
// console.log(`res: `, res);


// const resultA = getG(Math.atan(res));
// console.log('result: ', resultA);


// const a = Math.tan(getR(g2 - g1));
// console.log(`Math.tan(getR(g2 - g1): `, a);
// const b = Math.sin(getR(v));
// console.log(`Math.sin(getR(v): `, b);
// const c = a / b;
// console.log(`a / b : `, c);
// const atan = Math.atan(getR(c));
// console.log(`atanR: `, atan);
// console.log(`atanG: `, getG(atan));

// console.log(`Math.tan(getR(g2 - g1)) / Math.sin(getR(v)))`, Math.atan(getR(Math.tan(getR(g2 - g1)) / Math.sin(getR(v)))));


// #include "StdAfx.h"
// #include "GSanSystem.h"
// #include "math.h"

// #define M_PI       3.14159265358979323846
// #define Rad(x)		x*M_PI/180.0
// GSanSystem::GSanSystem(void)
// {
// }

// GSanSystem::~GSanSystem(void)
// {
// }

// int GSanSystem::round (double n)
// {
// 	double t;
// 	t=n-double(n);
// 	if(t>=0.5)
// 	{
// 		n*=10;
// 		ceil(n);
// 		n/=10;
// 	}
// 	else
// 	{
// 		n*=10;
// 		floor(n);
// 		n/=10;
// 	}
// 	return (int)n;
// }


// void GSanSystem::SunPos(
// 			double  lon, //Долгота
// 			double  lat,//Широта
// 			double  Year,//год
// 			double  Mon,// месяцы
// 			double  Day,// дни
// 			double  hous,//часы
// 			double  min,//минуты
// 			double sec,// секунды
// 			double zona// Часовой пояс
// 		   )

// {
// 		//1.Вычисление модифицированной  юлианской даты на начало суток

// 	 double Var1,Var2,Var3;
// 	 Var1 = 10000 * Year + 100 * Mon + Day;
// 	 if(Mon <= 2 )
// 	 {
// 		Mon = Mon + 12;
// 		Year = Year - 1;
// 	 }
// 	 if( Var1 <= 15821004) Var2 = -2 + floor((Year + 4716) / 4) - 1179;
// 	 else  Var2 = floor(Year /400) - floor(Year / 100) + floor(Year / 4);
// 	 Var3 = 365 * Year - 679004;
// 	 // MJD - Модифицированная Юлианская дата
// 	 double MJD = Var3 + Var2 + floor(306001 * (Mon + 1)/ 10000) + Day;


// 	// Вычисление Гринвеческого звездного времени

// 	double T0 = (MJD - 51544.5) / 36525; // мод.юл.дата на начало суток в юлианских столетиях
// 	double a1 = 24110.54841;
// 	double a2 = 8640184.812;
// 	double a3 = 0.093104;
// 	double a4 = 0.0000062;
// 	double S0 = a1 + a2 * T0 + a3 * T0*T0- a4 * T0 *T0*T0;// звездное время в Гринвиче на начало суток в секундах
// 	//UT - всемирное время в часах, момент расчета
// 	double UT = hous-zona + min/60 + sec/3600;
// 	if(UT>24)UT=UT-24;
// 	if(UT<0)UT=UT+24;
// 	double Nsec = UT * 3600; // количество секунд, прошедших  от начала суток до момента наблюдения

// 	double NsecS = Nsec * 366.2422 / 365.2422; //количество  звездных секунд
// 	double GMT = (S0 + NsecS) /3600 * 15;//гринвическое среднее звездное время в градусах SG
// 	while(GMT>360)GMT=GMT-360;
// 	double GST = GMT + lon;// местное звездное время ST
// 	//Lon – долгота наблюдателя


// 	//  Вычисление эклиптических координат Солнца

// 	T0 = (MJD - 51544.5) / 36525; // мод.юл.дата на начало суток в юлианских столетиях
// 	double M = 357.528 + 35999.05 * T0 + 0.04107 * UT;// средняя аномалия
// 	while(M>360)M=M-360;
// 	double L0 = 280.46 + 36000.772 * T0 + 0.04107 * UT;
// 	double L = L0 + (1.915 - 0.0048 * T0) * sin(Rad(M)) + 0.02 * sin(Rad(2 *M));//долгота Солнца
// 	while(L>360)L=L-360;

// 	double X = cos(Rad(L)) ; // вектор
// 	double Y = sin(Rad(L)) ; //  в эклиптической
// 	double Z = 0      ; //  системе координат


// 	// Координаты Cолнца в прямоугольной экваториальной системе координат

// 	double Eps = 23.439281   ; //наклон эклиптики к экватору
// 	double  X’ =  X ;                          // вектор
// 	double  Y’ = Y * cos(Rad(Eps)) - Z * sin(Rad(Eps)); //   в экваториальной
// 	double  Z’ = Y * sin(Rad(Eps)) + Z * cos(Rad(Eps)) ;//    системе координат


// 	// Экваториальные геоцентрические координаты Солнца
// 	// RA - прямое восхождение Солнца на нужный момент времени
// 	//DEC - склонение Солнца на нужный момент времени

// 	double Ra = atan2(Y’ ,X’)*180/M_PI;
// 	double Dec = atan2 (Z’ , sqrt(X’*X’ + Y’*Y’))*180/M_PI;


// 	//  Азимутальные координаты Солнца


// 	//Lat - широта

// 	double Th = GST - Ra  ;//часовой угол
// 	double z  = acos(sin(Rad(lat)) * sin(Rad(Dec)) + cos(Rad(lat)) * cos(Rad(Dec)) * cos(Rad(Th)))*180/M_PI;// косинус зенитного угла
// 	double H = 90 - z;
// 	double Az = atan2( sin(Rad(Th)) * cos(Rad(Dec)) * cos(Rad(lat)),sin(Rad(H)) * sin(Rad(lat)) - sin(Rad(Dec)))*180/M_PI;

// 	// получаем подсолнечную точку
// 	// Долгота Солнца
// 	double LonSan = Ra - GST;
// 	// Широта Солнца
// 	double LatSan = Dec;

// }
