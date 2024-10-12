export type ITooltipPostion = 'left' | 'right' | 'top' | 'bottom';

export const TOOLTIP_POSTION = {
    top: [
        {
            originX: 'center',
            originY: 'top',
            overlayX: 'center',
            overlayY: 'bottom',
            offsetY: -10,
        },
        {
            originX: 'center',
            originY: 'bottom',
            overlayX: 'center',
            overlayY: 'bottom',
            offsetY: 60,
        },
      ],
      right: [
        {
            originX: 'end',
            originY: 'center',
            overlayX: 'start',
            overlayY: 'bottom',
            offsetX: 20,
            offsetY: 20,
        },
        {
            originX: 'start',
            originY: 'center',
            overlayX: 'end',
            overlayY: 'bottom',
            offsetX: -20,
            offsetY: 20,
        },
      ],
      bottom: [
        {
            originX: 'center',
            originY: 'bottom',
            overlayX: 'center',
            overlayY: 'bottom',
            offsetY: 60,
        },
        {
            originX: 'center',
            originY: 'top',
            overlayX: 'center',
            overlayY: 'top',
            offsetY: -10,
        },
      ],
      left: [
        {
            originX: 'start',
            originY: 'center',
            overlayX: 'end',
            overlayY: 'bottom',
            offsetX: -20,
            offsetY: 20,
        },
        {
            originX: 'end',
            originY: 'center',
            overlayX: 'start',
            overlayY: 'bottom',
            offsetX: 20,
            offsetY: 20,
        },
    ]
}
