'use client';
import JIFFClient from 'jiff-mpc/lib/jiff-client';

const Connect = function (hostname, computation_id) {
      console.log('Connect' )
      var opt = {};
      opt.crypto_provider = true;
      opt.party_count = 2;
      opt.onConnect = function () {
        console.log('connectedxxx')
      };
      

      // eslint-disable-next-line no-undef
      //JIFFClient = require('jiff-mpc/lib/jiff-client');
      var saved_instance = new JIFFClient("http://localhost:8080", 'bajingan', opt);
      console.log('saved_instance', saved_instance)

      return saved_instance;
};

export default Connect;
  
