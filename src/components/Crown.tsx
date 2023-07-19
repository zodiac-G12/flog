import type {Component} from 'solid-js';
import {css} from 'solid-styled-components';
import {i18n} from '@/i18next/init';
import {Img} from '@/components';

export const Crown: Component = () => {
  return (
    <div class={CrownContainer}>
      <div class={IconWithText}>
        <Img width={'60px'} height={'60px'} src={'fblok.png'} />
        <div class={ServiceNameContainer}>
          <div class={ServiceName}>{i18n.t('serviceName')}</div>
        </div>
      </div>
    </div>
  );
};

const CrownContainer = css({
  height: '65px',
  background: 'white',
});

const IconWithText = css({
  textAlign: 'center',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
});

const ServiceNameContainer = css({
  height: '65px',
  display: 'flex',
  alignItems: 'center',
});

const ServiceName = css({
  marginTop: '25px',
  fontSize: '40px',
  fontFamily: 'Gotham Bold',
  fontWeight: 'Bold',
  color: '#698403',
});
