/// <reference types="cypress" />
// ***********************************************************
// This example plugins/index.js can be used to load plugins
//
// You can change the location of this file or turn off loading
// the plugins file with the 'pluginsFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/plugins-guide
// ***********************************************************

// This function is called when a project is opened or re-opened (e.g. due to
// the project's config changing)

const { Pool } = require('pg')

/**
 * @type {Cypress.PluginConfig}
 */
// eslint-disable-next-line no-unused-vars
module.exports = (on, config) => {
  // `on` is used to hook into various events Cypress emits
  // `config` is the resolved Cypress config

  const configJson = require(config.configFile)

  const pool = new Pool(configJson.dbConfig)

on('task', {
  //função para apagar um item do BD antes do test
  removeUser(email) {
    return new Promise(function(resolve) {
      pool.query('DELETE FROM public.users WHERE EMAIL = $1', [email], function(error, result) {
        if(error) {
          throw error
        }
        resolve({
          success: result
        })
      })
    })
  },
  //função para pegar o token gerado na alterção de senha
  findToken(email) {
    return new Promise(function(resolve) {
      pool.query(`select B.token from
      public.users A
      INNER JOIN public.user_tokens B
      ON A.id = B.user_id
      WHERE A.email = $1
      ORDER BY b.created_at`, [email], function(error, result) {
        if(error) {
          throw error
        }
        resolve({token: result.rows[0].token})
      })
    })
  }
})
}
