import { trigger, animate, transition, style, query } from '@angular/animations';

export const fadeAnimation = trigger('fadeAnimation', [
	transition('* => *', [
		query(':enter', [style({ opacity: 0 })], { optional: true }),

		query(':leave', [style({ opacity: 1 }), animate('0.5s', style({ opacity: 0 }))], { optional: true }),

		query(':enter', [style({ opacity: 0 }), animate('0.5s', style({ opacity: 1 }))], { optional: true }),
	]),
]);

export const ngIfAnimation = trigger('ngIfAnimate', [
	transition(':enter', [
		style({ opacity: 0 }),
		animate(500, style({ opacity: 1 })),
	]),
	transition(':leave', [
		animate(500, style({ opacity: 0 })),
	]),
]);
